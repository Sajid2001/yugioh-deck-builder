from flask import Blueprint, request, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db 
import re
from flask_jwt_extended import create_access_token
#from flask_login import login_user, login_required, logout_user, current_user


def create_token(user_id):
    access_token = create_access_token(identity=user_id)
    return access_token

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods = ['POST'])
def signin():
    if request.method == 'POST':
        email = request.get_json().get('email')
        password = request.get_json().get('password')

        if not email or not password:
            return jsonify({'error': 'Fields should not be empty'}), 400
        
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                token = create_token(user.id)
                #login_user(user, remember=True)
                return jsonify({"id":user.id,"username": user.username, "token":token }), 200
            else:
                return jsonify({'error': 'Incorrect Password'}), 400
        else:
            return jsonify({'error': 'User does not exist'}), 400

# @auth.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     return jsonify({'message':"Logged out"}), 200

@auth.route('/signup', methods = ['POST'])
def signup():
    if request.method == 'POST':
        username = request.get_json().get('username')
        email = request.get_json().get('email')
        password = request.get_json().get('password')

        if not email or not password or not username:
            return jsonify({'error': 'Fields should not be empty'}), 400
        
        if len(username) < 4:
            return jsonify({'error': 'Invalid Username'}), 400
    
        valid_email = re.match(r'^[\w.-]+@[\w.-]+\.\w+$', email)
        if not valid_email:
            return jsonify({'error': 'Invalid email format'}), 400
        
        is_valid_password = re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password)

        if not is_valid_password:
            return jsonify({'error': 'Password is not strong enough'}), 400
        
        hash_password = generate_password_hash(password, method='scrypt')

        new_user = User(username=username, email=email, password=hash_password)
        db.session.add(new_user)
        db.session.commit()
        token = create_token(new_user.id)
        #login_user(new_user, remember=True)

        return jsonify({"id":new_user.id,"username": username, "token":token}), 200
