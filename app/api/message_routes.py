from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, Conversation, db

message_routes = Blueprint('messages', __name__)

