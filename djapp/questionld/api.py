# python manage.py runserver

from ninja import NinjaAPI
from questionld.models import User, Daily
from questionld.schema import UserSchema, NotFoundSchema, DailySchema, ContentSchema

import random
import requests
from typing import List
from datetime import datetime
import os
from dotenv import load_dotenv
import json


import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ.get('SECRET_KEY'))




api = NinjaAPI()

@api.get("/test")
def test(request):
    return {'test': 'success'}

@api.post("/new-user", response=UserSchema)
def create_user(request):
    while True:
        new_id = random.randint(100000000, 999999999)
        if not User.objects.filter(id=new_id).exists():
            break
    user = User.objects.create(id=new_id)
    return 200, user

@api.get("/user/{id}", response={200: UserSchema, 404: NotFoundSchema})
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return 200, user
    except:
        return 404, {'message': 'Could not find user'}
    
@api.get("/today", response={200: List[DailySchema], 404: NotFoundSchema})
def get_today(request):
    try:
        user_id = request.headers['Authorization']
        date = datetime.now().strftime("%Y-%m-%d")

        today = Daily.objects.filter(user=user_id, date=date).values()

        return today
    except:
        return 404, {'message': 'Could not find list'}
    
@api.post("/message", response={200: DailySchema, 404: NotFoundSchema})
def send_question(request, data: ContentSchema):
    user_id = request.headers['Authorization']
    date = datetime.now().strftime("%Y-%m-%d")
    todaysword = getTodaysWord(date)
    
    # check if user exists
    if not User.objects.get(id=user_id):
        return 404, {'message': 'Could not find user'} 

    # add new message to database
    new_message = Daily.objects.create(user=user_id, date=date, content=data.content, type='user')

    # Generate the prompt
    model = genai.GenerativeModel(
        model_name='gemini-1.5-flash-001',
        system_instruction=["You are a game master of a simple game of 20 questions.",
                            f"The word that the user is trying to guess is: {todaysword}.",
                            "You can not tell the user the word unless the user correctly identifies it.",
                            "The user will ask you a question, give a simple yes/no/sometimes/maybe response with a quick explanation for why without giving the answer away.",
                            "On Question 6, 11, and 16 give the user a better hint to push them in the correct direction.",
                            "Important! when the word is found respond with a congratulations message and the key word DONE.",
                            "If the user responds with something unirrelevant count it as a question and responde with 'No, I can't help with that. Ask yes or no questions.'"
                            "Do not use the word any of the hints."
                            "If the user asks a question that can't be answered with yes/no/sometimes/maybe, respond with 'No, ask yes or no questions.'",
                            "If the user asks for the word, respond with 'No, ask yes or no questions.'"
                            ])
    
    # Get all old messages
    today = Daily.objects.filter(user=user_id, date=date).values()
    
    # Send all old and new messages to gemini
    messages = []
    for message in today:
        messages.append({'role':message['type'], 'parts':[message['content']]})

    response = model.generate_content(messages)
    
    new_message = Daily.objects.create(user=user_id, date=date, content=response.text, type='model')
    return new_message
    




def getTodaysWord(date:str) -> str:
    with open('word.json', 'r') as file:
        data = json.load(file)
    return data[date]
