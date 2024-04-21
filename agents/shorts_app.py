from flask import request, jsonify
from uagents.query import query
from uagents import Model
import json
import asyncio
from database import get_db

AGENT_ADDRESS = "agent1q2p4shdx3ua25u73l26zdc36w4upax20vg7nqrsck3hqgqw7c46kv2e5z56"
QUIZ_AGENT_ADDRESS = "agent1qthuasc2j4ugmzuh45jcm72m634l4u90r0pagw3celtzx8lhujw3qhpqwa0"

class AppRequest(Model):
    query: str

class QuizRequest(Model):
    query: str

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

def setup_short_routes(app):
    @app.route('/generate-short', methods=['POST'])
    def create_short():
        data = request.json
        source_video_url = data.get('source_video_url')
        req = AppRequest(query=source_video_url)
        # result = asyncio.run(make_agent_call(AGENT_ADDRESS, req))
        result = "Here"
        result_create_quiz = asyncio.run(make_agent_call(QUIZ_AGENT_ADDRESS, QuizRequest(query='032b983a-ce6a-494f-af32-2f4ac56af471')))
        return result
        
    @app.route('/questions', methods=['GET'])
    def get_questions():
        db = get_db()
        questions_collection = db.questions  
        questions = list(questions_collection.find({}, {'_id': 0}))  
        return jsonify(questions)
