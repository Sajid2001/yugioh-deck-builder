from app import create_app
from os import path, getenv
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=getenv('PORT'))
    