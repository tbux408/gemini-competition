from ninja import Schema
from datetime import datetime


class UserSchema(Schema):
    id: int
    streak: int

class NotFoundSchema(Schema):
    message: str



class ContentSchema(Schema):
    content: str

# class ResponseSchema(Schema):
#     answer: str
#     explanation: str
#     finished: bool
#     hint: str

class DailySchema(Schema):
    id: int
    user: int
    date: str
    content: str
    type: str
    # details: ResponseSchema