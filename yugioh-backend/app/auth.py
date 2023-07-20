from flask import Blueprint, request, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db 
import re
from flask_login import login_user,login_required, logout_user

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods = ['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        if not email or not password:
            return jsonify({'error': 'Fields should not be empty'}), 400
        
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                return jsonify({"email": email, "username": user.username}), 200
            else:
                return jsonify({'error': 'Incorrect Password'}), 400
        else:
            return jsonify({'error': 'User does not exist'}), 400

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not email or not password or not username:
            return jsonify({'error': 'Fields should not be empty'}), 400
    
        valid_email = re.match(r'^[\w.-]+@[\w.-]+\.\w+$', email)
        if not valid_email:
            return jsonify({'error': 'Invalid email format'}), 400
        
        is_valid_password = re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password)

        if not is_valid_password:
            return jsonify({'error': 'Password is not strong enough'}), 400
        
        hash_password = generate_password_hash(password, method='sha256')

        new_user = User(username=username, email=email, password=hash_password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)

        return jsonify({"email": email, "username": username}), 200

    return {"message":"sign up"}