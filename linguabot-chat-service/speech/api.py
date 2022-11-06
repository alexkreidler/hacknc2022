
from google.cloud import speech
import io

from dataclasses import dataclass
from typing import Union

from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, File, UploadFile

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from google.protobuf.json_format import MessageToJson, MessageToDict

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


status = "starting"

@app.get("/")
def read_root():
    return {"status": status}


@app.post("/transcribe")
def transcribe_audio(audio_data: bytes = File()):
    # content = await audio_data.read()
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_data)
    config = speech.RecognitionConfig(
        # encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        # sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    transcript = ""
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        chunkT = result.alternatives[0].transcript
        transcript += chunkT
        print(u"Transcript: {}".format(chunkT))
        # json = MessageToJson(result)
        # print(json)
    result_json = MessageToDict(response.results)
    print(result_json)
    return transcript

status = "ok"