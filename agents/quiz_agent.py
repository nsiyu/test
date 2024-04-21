from uagents import Agent, Context, Model
from uagents.query import query
from openai import OpenAI
import json
from database import get_db

client = OpenAI(api_key='sk-proj-K7yBJwVbtJA5nleRKW1gT3BlbkFJak88GGzRlDzVB3x7eGGZ')

class QuizRequest(Model):
    query: str 
 
class QuizResponse(Model):
    query: str 

GEMINI_AGENT = 'agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l'
 
QuizAgent = Agent(
    name="Quiz Agent",  
    seed="Quiz Agent Seed Phrase",
    port=8015,  
    endpoint="http://localhost:8015/submit",  
)

async def agent_query(query_text):
    response = await query(destination=GEMINI_AGENT, message=query_text, timeout=15.0)
    data = json.loads(response.decode_payload()) 
    return data["text"]

async def make_agent_call(query_text):
    response = await agent_query(query_text)
    print(type(response))
    return f"{response}"

@QuizAgent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {QuizAgent.name}")
 
@QuizAgent.on_query(model=QuizRequest, replies={QuizResponse})
async def query_handler(ctx: Context, sender: str, _query: QuizRequest):
    ctx.logger.info("Query received")
    try:
        with open("./temp.mp4", "rb") as audio_file:
            print("Audio file opened.")
            transcription_response = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file, 
                response_format="text"
            )
            transcription = transcription_response
            print("Transcription received.")
        prompt = '''Based on the text below, generate a 5 question quiz regarding the content. Only give the question and the questions should be seperated by a | as deliminator
        do not include anything else in your response. Dont number them.
        '''
        prompt += transcription
        print(prompt)
        # Call make_agent_call directly without asyncio.run()
        gemini_response = await make_agent_call(QuizRequest(query=prompt)) 
        db = get_db()

        for question in gemini_response.split('|'):
            db.questions.insert_one({"question": question})

    except Exception as e:
        ctx.logger.error(f"Failed to process the audio: {str(e)}")
        await ctx.send(sender, QuizResponse(query="Failed to process the request."))

if __name__ == "__main__":
    QuizAgent.run()
