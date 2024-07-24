from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ARRAY

class Conversation(db.Model):

    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    participants = db.Column(ARRAY(Unicode))
    messages = db.Column(ARRAY(Unicode))

    def to_dict(self):
        return {
            'id': self.id,
            'messages': self.messages,
        }