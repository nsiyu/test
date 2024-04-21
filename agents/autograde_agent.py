from uagents import Agent, Context, Model
from uagents.query import query
from openai import OpenAI
import json
from database import get_db
from typing import List

class AutoGradeRequest(Model):
    query: List[str] 
 

class AutoGradeGeminiRequest(Model):
    query: str
 
class AutoGradeResponse(Model):
    text: str 

GEMINI_AGENT = 'agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l'
 
AutoGradeAgent = Agent(
    name="Auto Grade Agent",  
    seed="Auto Grade Agent Seed Phrase",
    port=8016,  
    endpoint="http://localhost:8016/submit",  
)

async def agent_query(query_text):
    response = await query(destination=GEMINI_AGENT, message=query_text, timeout=15.0)
    data = json.loads(response.decode_payload()) 
    return data["text"]

async def make_agent_call(query_text):
    response = await agent_query(query_text)
    print(type(response))
    return f"{response}"

@AutoGradeAgent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {AutoGradeAgent.address}")
 
@AutoGradeAgent.on_query(model=AutoGradeRequest, replies={AutoGradeResponse})
async def query_handler(ctx: Context, sender: str, _query: AutoGradeRequest):
    ctx.logger.info("Query received")
    try:
        prompt = "Based on the questions and answers below below, grade the question and give it an associated feedback. Format your response as 'Question|Result|Feedback' for each question and seperate them by | as well"
        prompt += "\n".join(_query.query)
        gemini_response = await make_agent_call(AutoGradeGeminiRequest(query=prompt)) 
        print(gemini_response)
        db = get_db()
        entries = gemini_response.split('|')

        if len(entries) % 3 != 0:
            raise ValueError("The response format is incorrect, expected multiples of three for Question|Result|Feedback.")

        for i in range(0, len(entries), 3):
            question, result, feedback = entries[i], entries[i+1], entries[i+2]
            db.grader.insert_one({"question": question, "result": result, "feedback": feedback})

    except Exception as e:
        ctx.logger.error(f"Failed to process the query: {str(e)}")
        await ctx.send(sender, AutoGradeResponse(text="Failed to process the request."))

if __name__ == "__main__":
    AutoGradeAgent.run()
