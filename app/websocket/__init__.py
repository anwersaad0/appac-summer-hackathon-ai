from flask_login import current_user
from flask_socketio import SocketIO

# The socket object with logging turned on for debugging purposes
socketio = SocketIO(logger=True, engineio_logger=True)

@socketio.on('connect')
def handle_connection():
    print(' === A user connected === ', current_user)

@socketio.on('disconnect')
def handle_disconnection():
    print(' === A user disconnected === ')

@socketio.on('load_messages')
def load_messages(conversation_id: int):
    pass

# request : {
#   authorId: integer,
#   conversationId: integer,
#   message: string
# }
@socketio.on('send_message')
def send_message(request: dict):
    pass

@socketio.on('create_conversation')
def create_conversation(author_id: int, recipient_id: int):
    pass