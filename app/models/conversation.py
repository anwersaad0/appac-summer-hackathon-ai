from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ARRAY

from .user_convo import user_convo

class Conversation(db.Model):

    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, default='Conversation')

    participants = db.relationship('User', secondary=user_convo, back_populates="conversations")

<<<<<<< HEAD
    messages = db.relationship('Message', back_populates="conversation", cascade="all, delete-orphan")
=======
    messages = db.relationship('Message', back_populates="conversations", cascade="all, delete-orphan")
>>>>>>> 2291d3ef80d4fa659a8b06e6e3eba50f0793f4c9

    def to_dict(self):
        return {
            'id': self.id,
            'participants': self.participants,
            'messages': self.messages,
        }