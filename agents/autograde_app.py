from flask import request
from uagents.query import query
from uagents import Model
import json
import asyncio
from typing import List
from flask import request, jsonify

AGENT_ADDRESS = "agent1q2p4shdx3ua25u73l26zdc36w4upax20vg7nqrsck3hqgqw7c46kv2e5z56"
GEMINI_AGENT = 'agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l'

class AutoGradeRequest(Model):
    query: List[str] 
 
class AutoGradeResponse(Model):
    text: str 

async def agent_query(address, query_text):
    response = await query(destination=address, message=query_text, timeout=15.0)
    data = json.loads(response.decode_payload()) 
    return data["text"]

async def make_agent_call(address, query_text):
    try:
        response = await agent_query(address, query_text)
        return f"{response}"
    except Exception as e:
        return f"unsuccessful agent call - error: {str(e)}"


def setup_autograde_routes(app):
    @app.route('/autograde', methods=['POST'])
    def autograde():
        # Try to get JSON data from the request
        try:
            data = request.get_json()
            if 'questions' not in data:
                return jsonify({"error": "No questions provided"}), 400
            
            questions = data['questions']
            formatted_questions = [f"{item['question']}|{item['answer']}" for item in questions if 'question' in item and 'answer' in item]
            result = asyncio.run(make_agent_call(GEMINI_AGENT, AutoGradeRequest(query=formatted_questions)))
            return jsonify({"message": result}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

# Example usage with a Flask app
# from flask import Flask
# app = Flask(__name__)
# setup_autograde_routes(app)
# app.run(debug=True)
