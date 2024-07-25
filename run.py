from app import app
from app.websocket import socketio
import os
environment = os.getenv('FLASK_DEBUG')

cors_list = [] if environment == 'production' else [
    'http://localhost:5173', 
    'http://127.0.0.1:5173', 
    'http://localhost:8000', 
    'http://127.0.0.1:8000'
]
    
socketio.init_app(app, manage_session=False, cors_allowed_origins=cors_list)

# Starts the app with socketio support
if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)