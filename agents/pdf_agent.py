from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

pdf_agent = Agent(
    name="pdf_agent",
    port=8008,
    seed="send daily reminder mails",
    endpoint=["http://127.0.0.1:8008/submit"],
)

class QueryRequest(Model):
    query: str

class Response(Model):
    text: str 

fund_agent_if_low(pdf_agent.wallet.address())


@pdf_agent.on_query(model=QueryRequest, replies={Response})
async def interval(ctx: Context):
   pass

if __name__ == "__main__":
    pdf_agent.run()
