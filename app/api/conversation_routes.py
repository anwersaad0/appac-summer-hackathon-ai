from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Message, Conversation, db
from app.forms import NewMessage

conversation_routes = Blueprint('conversations', __name__)

@conversation_routes.route('/')
@login_required
def get_conversations():
    convos = Conversation.query.filter(current_user.id in Conversation.participants)
    return {'conversations': [conversation.to_dict() for conversation in convos]}

@conversation_routes.route('/<int:id>')
@login_required
def view_conversation(id):
    convo = Conversation.query.get(id)

    return convo.to_dict()

@conversation_routes.route('/<int:id>/message')
@login_required
def send_message(id):
    convo = Conversation.query.get(id)

    form = NewMessage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message = Message(
            content = form.data['content'],
            user_id = current_user.id,
            convo_id = convo.id
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    
    return {"errors": form.errors}

@conversation_routes.route('/new', methods=["POST"])
@login_required
def start_conversation():
    #form here
    
    return {'errors'}