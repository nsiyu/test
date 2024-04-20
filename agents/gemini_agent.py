from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from uagents import Model
import google.generativeai as genai

class QueryRequest(Model):
    query: str

class Response(Model):
    text: str 

class PdfRequest(Model):
    query: str

class PdfResponse(Model):
    text: str 

Gemini_agent = Agent(
    name="Gemini Agent",
    port=8001,
    seed="Gemini Agent secret phrase",
    endpoint=["http://localhost:8001/submit"],
)
 
fund_agent_if_low(Gemini_agent.wallet.address())

genai.configure(api_key='AIzaSyAdymAwcZX9JjHJV-y7yN_60yZsGq6AYGE')
    
model = genai.GenerativeModel('gemini-pro')
    
chat = model.start_chat(history=[])

async def handle_message(message):
    user_message = message
    response = chat.send_message(user_message, stream=True)
    
    full_response_text = ""
    
    for chunk in response:
        full_response_text += chunk.text
        
    message = "Gemini: " + full_response_text
    return message
        
@Gemini_agent.on_event('startup')
async def address(ctx: Context):
    ctx.logger.info(Gemini_agent.address)

@Gemini_agent.on_query(model=QueryRequest, replies={Response})
async def handle_query_response(ctx: Context, sender: str, _query: QueryRequest):
    message = await handle_message(_query.query)
    ctx.logger.info(message)
    await ctx.send(sender, Response(text=message))

@Gemini_agent.on_query(model=PdfRequest, replies={PdfResponse})
async def handle_query_response(ctx: Context, sender: str, _query: PdfRequest):
    message = await handle_message(_query.query)
    ctx.logger.info(message)
    await ctx.send(sender, PdfResponse(text=message))

if __name__ == "__main__":
    Gemini_agent.run()
    