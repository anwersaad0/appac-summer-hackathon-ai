from .db import db, environment, SCHEMA

class Message(db.Model):

    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)

    #user_id
    #convo_id

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
        }