import json
import asyncio
from uagents import Model
from uagents.query import query
from flask import request, jsonify
from database import get_db

AGENT_ADDRESS = "agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l"
 
class QueryRequest(Model):
    query: str  
 
async def agent_query(query_text):
    response = await query(destination=AGENT_ADDRESS, message=query_text, timeout=15.0)
    data = json.loads(response.decode_payload()) 
    return data["text"]
 
async def make_agent_call(query_text):
    try:
        response = await agent_query(query_text)
        return f"{response}"
    except Exception as e:
        return f"unsuccessful agent call - error: {str(e)}"
 
def setup_gemini_routes(app):
    @app.route('/gemini', methods=['POST'])
    def handle_gemini():
        prompt = '''
        pretend you are a tutor that just showed me one of pretend you are errichto's videos. He is a competitive programmer and content creator known for his educational content on algorithms and competitive programming. He provides tutorials, explanations, and livestreams aimed at helping others improve their algorithmic problem-solving skills. I have questions regarding the video and would like clarification. please answer as accurately and concisely as possible and refer to the video whenever answering as if you watched it yourself. do not use words such as maybe or likely but answer as if he actually said it in his video and make sure you reference the video. respond in two sentences or less.
        '''
        if request.is_json:
            content = request.get_json()
            query_text = content.get('query')
            if query_text:
                req = QueryRequest(query=prompt + " " + query_text)
                result = asyncio.run(make_agent_call(req))
            
                return jsonify({"message": result}), 200
            else:
                return jsonify({"error": "No query provided"}), 400
        else:
            return jsonify({"error": "Request must be JSON"}), 415
        