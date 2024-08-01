import pathlib
import textwrap
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')


def translation_request(lang, message):
    prompt = f"Translate this message into {lang} without extra options: {message}"
    response = model.generate_content(prompt)

    print(response.text)
    return response

def transliteration_request(lang, message):
    prompt = f"Provide an English Transliteration of this message in {lang} without extra options: {message}"
    res = model.generate_content(prompt)

    print(res.text)

transliteration_request('Japanese', 'Did you get my last text?')