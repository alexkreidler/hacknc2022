
from dataclasses import dataclass
from nanoid import generate
from typing import Optional, Union

from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, Form, UploadFile

from pydantic import BaseModel
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@dataclass
class Chat():
    id: str
    history: list[str]

# A dict mapping from the chat ID to an object containing the chat history list
chats: dict[str, Chat] = {}

status = "starting"

@app.get("/")
def read_root():
    return {"status": status}


@app.get("/chats/{chat_id}")
def read_chat(chat_id: str):
    chat = chats[chat_id]
    return jsonable_encoder(chat) #{"id": chat_id, "history": chat.history}

@app.post("/chats")
def create_chat():
    new_id = generate(size=16)
    new_chat = Chat(new_id, [])
    chats[new_id] = new_chat
    return new_chat

@app.get("/chats")
def list_chats():
    return list(chats.keys())

from main import pipeline


# @dataclass
class SimpleMessage(BaseModel):
    text: str

@app.post("/chats/{chat_id}/message")
def send_message(chat_id: str, message: SimpleMessage):
    # print(chat_id, message)
    chat = chats[chat_id]
    out = pipeline(message.text, chat.history)
    # n = Message(message, out[1], out[0], out[2])
    chat.history.append(out[0])
    print(out[1])
    
    return jsonable_encoder(chat) #{"id": chat_id, "history": chat.history}



from google.cloud import speech
from google.cloud.speech import SpeechRecognitionResult
@app.post("/transcribe")
def transcribe_audio(audio_data: bytes = File(), language: Optional[str] = Form()):
    # content = await audio_data.read()
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_data)
    config = speech.RecognitionConfig(
        # encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        # sample_rate_hertz=16000,
        language_code=language,
        # "en-US",
    )

    response = client.recognize(config=config, audio=audio)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    transcript = ""
    results: list[SpeechRecognitionResult] = response.results
    
    out = []
    for result in results:
        most_likely_chunk = result.alternatives[0].transcript
        transcript += most_likely_chunk
        
        result_json = SpeechRecognitionResult.to_dict(result)
        out.append(result_json)

    print("Handling request, transcript length", len(transcript))
    f = {"transcript": transcript, "details": out}
    # print(f)
    return f


status = "ok"



