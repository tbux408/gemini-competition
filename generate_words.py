import json
from datetime import datetime, timedelta
import random
import string

# Starting date
start_date = datetime.strptime("2024-05-29", "%Y-%m-%d")

# Number of days
num_days = 100

words = ["turn", "dock", "balance", "rhythm", "company", "weight", "doll", "finger", "hole", "measure", "dime", "bath", "rest", "scale", "talk", "calendar", "laugh", "sisters", "cause", "oven", "window", "time", "coal", "grip", "fold", "hammer", "girl", "hall", "throne", "wing", "system", "error", "veil", "guide", "move", "daughter", "rule", "respect", "decision", "legs", "cracker", "payment", "pleasure", "pigs", "train", "question", "cap", "button", "income", "cattle", "desire", "jar", "slip", "change", "connection", "instrument", "hands", "babies", "paper", "tramp", "face", "airport", "ball", "can", "creator", "downtown", "dinosaurs", "driving", "boy", "sticks", "experience", "heat", "price", "baseball", "cemetery", "calculator", "education", "fowl", "giants", "attraction", "action", "basin", "treatment", "border", "orange", "scarecrow", "recess", "committee", "argument", "cobweb", "sort", "memory", "meal", "frame", "cream", "route", "stretch", "books", "market", "sense"]

# Create a dictionary with dates and random words
date_word_dict = {}
for i in range(num_days):
    current_date = start_date + timedelta(days=i)
    date_str = current_date.strftime("%Y-%m-%d")
    random_word = words[i]
    date_word_dict[date_str] = random_word

# Save the dictionary to a JSON file
json_file_path = 'date_word.json'
with open(json_file_path, 'w') as json_file:
    json.dump(date_word_dict, json_file, indent=4)