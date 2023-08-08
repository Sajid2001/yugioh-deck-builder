from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from os import path, getenv
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
#from flask_login import LoginManager

load_dotenv()

db = SQLAlchemy()
DB_NAME = getenv('DB_NAME')

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    app.config["JWT_SECRET_KEY"] = getenv('JWT_SECRET_KEY')
    jwt = JWTManager(app)

    from .auth import auth
    from .decks import decks

    app.register_blueprint(decks, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Deck

    with app.app_context():
        db.create_all()

    return app

def create_database(app):
    if not path.exists('app/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database')