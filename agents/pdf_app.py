from flask import request, jsonify
import PyPDF2
from uagents.query import query
from uagents import Model
import json
import asyncio
from database import get_db
AGENT_ADDRESS = "agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l"

class PdfRequest(Model):
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

def setup_pdf_routes(app):
    @app.route('/upload-pdf', methods=['POST'])
    def upload_pdf():
        if 'file' not in request.files:
            return "No file part", 400

        file = request.files['file']

        if file.filename == '':
            return "No selected file", 400

        if file and file.filename.lower().endswith('.pdf'):
            try:
                reader = PyPDF2.PdfReader(file)
                text = "Please extract the dates from my syllabus below. Give me the information in day-month-topic,day-month-topic,day-month-topic format. Each activity should be comma seperated. For example if the date is January 18th and the topic is Electrostatics then it should be jan-18-electostatics"
                for page in reader.pages:
                    page_text = page.extract_text()
                    text += page_text
                req = PdfRequest(query=text)

                result = asyncio.run(make_agent_call(req))
                for item in result.split(','):
                    cur = item.split('-')
                    date = cur[0]
                    day = cur[1]
                    topic = ''
                    for word in cur[2:]:
                        topic += word
                        topic += ' '
                    topic = topic[:len(topic)-1]
                    db = get_db()
                    db.calendar.insert_one({"date": date, "day": day, "topic": topic})

                return jsonify({'text': text})
            except Exception as e:
                return str(e), 500
        else:
            return "Invalid file format", 400
        
    @app.route('/get-calendar-items', methods=['GET'])
    def get_calendar_items():
        db = get_db()
        try:
            items = db.calendar.find({})
            result = []
            for item in items:
                result.append({
                    "date": item.get('date', ''),
                    "day": item.get('day', ''),
                    "topic": item.get('topic', '')
                })
            return jsonify(result), 200
        except Exception as e:
            return str(e), 500
