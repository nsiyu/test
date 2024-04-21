from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import requests

shorts_agent = Agent(
    name="shorts_agent",
    port=8010,
    seed="created shorts from video emails",
    endpoint=["http://127.0.0.1:8010/submit"],
)

class AppRequest(Model):
    query: str

class AppResponse(Model):
    query: str

fund_agent_if_low(shorts_agent.wallet.address())

def generate_short(source_video_url, language="en", min_duration=1, max_duration=120, target_duration=60, api_key='kak_81c1120599a1-48ef-8a68-3a13a7955d00'):
    url = "https://api.klap.app/v1/videos"
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    payload = {
        'source_video_url': source_video_url,
        'language': language,
        'min_duration': min_duration,
        'max_duration': max_duration,
        'target_duration': target_duration
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code, response.text

@shorts_agent.on_query(model=AppRequest, replies={AppResponse})
async def handle_query_ressponse(ctx: Context, sender: str, _query: AppRequest):
    message = generate_short(_query.query)
    await ctx.send(sender, AppResponse(query=message['id']))

if __name__ == "__main__":
    shorts_agent.run()
