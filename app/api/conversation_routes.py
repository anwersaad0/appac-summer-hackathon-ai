from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Message, Conversation, db
from app.forms import NewMessage, NewConversation, EditConversation
from datetime import date

from ..api.gemini_helper import translation_request, transliteration_request

conversation_routes = Blueprint('conversations', __name__)

@conversation_routes.route('/')
@login_required
def get_conversations():
    convos = Conversation.query.filter(current_user.id in conversation.participants for conversation in Conversation.query.all())
    return {'conversations': [conversation.to_dict() for conversation in convos]}

@conversation_routes.route('/<int:id>/messages')
@login_required
def get_messages(id):
    convo = Conversation.query.get(id)
    messages = Message.query.filter(Message.convo_id == convo.id)

    return {'messages': [message.to_dict for message in messages]}

@conversation_routes.route('/<int:id>')
@login_required
def view_conversation(id):
    convo = Conversation.query.get(id)

    return convo.to_dict()

@conversation_routes.route('/<int:id>/message', methods=["POST"])
@login_required
def send_message(id):
    convo = Conversation.query.get(id)

    form = NewMessage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message = Message(
            content = form.data['content'],
            created_at = date.today(),
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
    form = NewConversation()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        convo = Conversation(
            name = form.data['name']
            #something for participants
            )
        
        db.session.add(convo)
        db.session.commit()
        return convo.to_dict()
    
    return {'errors': form.errors}

@conversation_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def change_convo_name(id):
    convo = Conversation.query.get(id)

    if not convo:
        return {"error": "You aren't in this conversation!"}
    
    form = EditConversation()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        convo.name = form.data['name']

        db.session.commit()
        return convo.to_dict()
    
    return {'errors': form.errors}


@conversation_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_conversation(id):
    convo = Conversation.query.get(id)

    if current_user.id in convo.participants:
        db.session.delete(convo)
        db.session.commit()
        return "Delete Successful"
    else:
        return "Must be a participant to delete."