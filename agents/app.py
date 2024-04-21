from flask import Flask
from flask_cors import CORS
from gemini_app import setup_gemini_routes
from pdf_app import setup_pdf_routes
from shorts_app import setup_short_routes
from autograde_app import setup_autograde_routes
app = Flask(__name__)
CORS(app)

setup_pdf_routes(app)
setup_gemini_routes(app)
setup_short_routes(app)
setup_autograde_routes(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
