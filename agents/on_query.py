import json
import asyncio
from uagents import Model
from uagents.query import query
from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_app import setup_gemini_routes
from pdf_app import setup_pdf_routes

app = Flask(__name__)
CORS(app)

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
        return f"successful call - agent response: {response}"
    except Exception as e:
        return f"unsuccessful agent call - error: {str(e)}"
 
@app.route('/query', methods=['POST'])
def handle_query():
    if request.is_json:
        content = request.get_json()
        query_text = content.get('query')
        req = QueryRequest(query=query_text)
        if query_text:
            result = asyncio.run(make_agent_call(req))
            return jsonify({"message": result}), 200
        else:
            return jsonify({"error": "No query provided"}), 400
    else:
        return jsonify({"error": "Request must be JSON"}), 415

setup_pdf_routes(app)
setup_gemini_routes(app)
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
