from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Message, Conversation, db

conversation_routes = Blueprint('conversations', __name__)

@conversation_routes.route('/')
@login_required
def get_conversations():
    convos = Conversation.query.filter(current_user.id in Conversation.participants)
    return {'conversations': [conversation.to_dict() for conversation in convos]}

@conversation_routes.route('/new', methods=["POST"])
@login_required
def start_conversation():
    #form here
    
    return {'errors'}