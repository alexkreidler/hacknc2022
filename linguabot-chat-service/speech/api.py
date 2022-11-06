
from google.cloud import speech
from google.cloud.speech import SpeechRecognitionResult
import io

from typing import Optional, Union

from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, File, Form, UploadFile

from fastapi.middleware.cors import CORSMiddleware

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