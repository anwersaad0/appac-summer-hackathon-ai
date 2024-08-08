from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ARRAY

from .user_convo import user_convo

class Conversation(db.Model):

    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    #name = db.Column(db.String(30), nullable=False, default='Conversation')

    participants = db.relationship('User', secondary=user_convo, back_populates="conversations")

    messages = db.relationship('Message', back_populates="conversation", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            #'name': self.name,
            'participants': self.participants,
            'messages': self.messages,
        }