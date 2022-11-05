
from dataclasses import dataclass
from nanoid import generate
from typing import Union

from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

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

status = "ok"



