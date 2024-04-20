import json
import asyncio
from uagents import Model
from uagents.query import query
from flask import request, jsonify

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
        if request.is_json:
            content = request.get_json()
            query_text = content.get('query')
            if query_text:
                req = QueryRequest(query=query_text)
                result = asyncio.run(make_agent_call(req))
                return jsonify({"message": result}), 200
            else:
                return jsonify({"error": "No query provided"}), 400
        else:
            return jsonify({"error": "Request must be JSON"}), 415