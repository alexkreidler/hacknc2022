from typing import Optional
from datetime import datetime
from dataclasses import dataclass
from nanoid import generate
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Could set up ML models on a GPU
device = "cpu"

def setup_translation(src, target):
    model_name = f"Helsinki-NLP/opus-mt-{src}-{target}"

    model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)

    tokenizer = AutoTokenizer.from_pretrained(model_name)
    return (model, tokenizer)

LANG = "es"
en_es = setup_translation("en", LANG)
es_en = setup_translation(LANG, "en")

def run_translation(model, tokenizer, input):
    batch = tokenizer([input], return_tensors="pt").to(device)

    generated_ids = model.generate(**batch)

    return tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

chatbot_tokenizer = AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill")

chatbot_model = AutoModelForSeq2SeqLM.from_pretrained("facebook/blenderbot-400M-distill").to(device)

def run_chatbot(inp):
    # TODO: add history here
    batch = chatbot_tokenizer(inp, return_tensors="pt").to(device)

    generated_ids = chatbot_model.generate(**batch)
    result = chatbot_tokenizer.batch_decode(generated_ids)[0]
    return result


# Run pipeline on single text input, adds to chat history, returns response
def pipeline(input_orig: str):
    input_en = run_translation(*es_en, input_orig)
    # print("Translated:", input_en, type(input_en))
    
    result_en: str = run_chatbot(input_en)
    # print("Chatbot reponse (en):", result_en)
    
    result_lang = run_translation(*en_es, result_en)
    print(f"Response ({LANG}):", result_lang)

def main_loop():
    inp = ""
    while inp != "quit":
        inp = input("Digame: ")
        if inp == "history":
            # print("".join(s.history))
            # inp = ""
            pass
        else:
            pipeline(inp)

main_loop()
