import pathlib
import textwrap
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')


def translation_request(lang, message):
    prompt = f"Translate this message into {lang} without extra options: {message}"
    response = model.generate_content(prompt)

    #print(response.text)
    return response

def transliteration_request(message):
    prompt = f"Provide an English Transliteration of this message without extra options: {message}"
    response = model.generate_content(prompt)

    #print(response.text)
    return response

#translation_request('English', '前のメッセージ届いた？ ')
#transliteration_request('前のメッセージ届いた？ ')