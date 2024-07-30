import pathlib
import textwrap
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')


def translation_request(lang, message):
    prompt = f"Translate this message into {lang}: {message}"
    response = model.generate_content(prompt)

    #print(response.text)
    return response

#translation_request('spanish', 'Did you get my message yet?')