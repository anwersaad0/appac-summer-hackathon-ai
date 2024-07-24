from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ARRAY

class Conversation(db.Model):

    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    participants = db.relationship('User', back_populates="conversations")

    messages = db.relationship('Message', back_populates="conversation", cascade="all, delete orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'messages': self.messages,
        }