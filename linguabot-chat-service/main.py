from dataclasses import dataclass
from typing import List, Optional


from datetime import datetime
from timeit import default_timer as timer

from nanoid import generate

# import torch

# GPU Setup
device = "cpu" #"cuda:0" if torch.cuda.is_available() else "cpu"
#print(torch.cuda.is_available(), device)
# device = "cuda"

#from pynvml import *


def print_gpu_utilization():
   pass

def f():
    nvmlInit()
    handle = nvmlDeviceGetHandleByIndex(0)
    info = nvmlDeviceGetMemoryInfo(handle)
    print(f"GPU memory occupied: {info.used//1024**2} MB.")


print_gpu_utilization()

# Language model setup

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from transformers import MarianTokenizer, MarianMTModel


def setup_translation(src="en", target="es"):
    model_name = f"Helsinki-NLP/opus-mt-{src}-{target}"

    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    model = model.to(device)

    tokenizer = AutoTokenizer.from_pretrained(model_name)
    return (model, tokenizer)


en_es = setup_translation()
es_en = setup_translation("es", "en")
# TODO: fix issue with period dropping further translation

print_gpu_utilization()


def run_translation(model, tokenizer, input):
    batch = tokenizer([input], return_tensors="pt").to(device)

    generated_ids = model.generate(**batch)

    return tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]


from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

chatbot_tokenizer = AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill")

chatbot_model = AutoModelForSeq2SeqLM.from_pretrained(
    "facebook/blenderbot-400M-distill"
).to(device)
print_gpu_utilization()



# "Hola, me llamo Carlos- Como estas?"

# s = ChatSession()

@dataclass
class Message:
    id: str
    input_orig: str
    input_en: str
    result_en: str
    result_lang: str
    time_received: Optional[datetime]


@dataclass
class Timing:
    msg_id: str
    translation1_timing: int
    chatbot_timing: int
    translation2_timing: int


def create_history_list(m: list[Message]) -> list[str]:
    return list(map(lambda x: x.input_en + " " + x.result_en, m))

    
def run_chatbot(inp):
    # run_translation(chatbot_tokenizer, chatbot_model, "Hi I'm Bob, how are you?")
    # inp =  "What do you like to do for fun?"

    # Point of history is to change LLM model input
    batch = chatbot_tokenizer(inp, return_tensors="pt").to(device)

    generated_ids = chatbot_model.generate(**batch)
    result = chatbot_tokenizer.batch_decode(generated_ids)[0]
    return result


# Run pipeline on single text input, adds to chat history, returns response
def pipeline(input_orig: str, history: list[Message]):
    received = datetime.now()
    #   print("Input:", inp)
    start_t1 = timer()
    input_en = run_translation(*es_en, input_orig)
    end_t1 = timer()
    translation1_timing = end_t1 - start_t1

    print("Translated:", input_en, type(input_en))
    start_c = timer()
    
    ctx = create_history_list(history)
    ctx.append(input_en)
    context = "".join(ctx)
    result_en: str = run_chatbot(context)
    
    # .replace("<s>", "").replace("</s>", "")
    
    end_c = timer()
    chatbot_timing = end_c - start_c

    print("Chatbot reponse (en):", result_en)
    start_t2 = timer()
    result_lang = run_translation(*en_es, result_en)
    end_t2 = timer()
    translation2_timing = end_t2 - start_t2
    print("Response (es):", result_lang)
    msgid = generate(size=16)
    return (Message(msgid, input_orig, input_en, result_en, result_lang, received), Timing(msgid, translation1_timing, chatbot_timing, translation2_timing))


def main_loop():
    inp = ""

    # TODO: drop furthest history 
    # otherwise we get this error: Token indices sequence length is longer than the specified maximum sequence length for this model (158 > 128). Running this sequence through the model will result in indexing errors
    # TODO: fix issue where the chatbot cant distinguish whos talking,  answers/asks questions based on info it provided. 
    history = []
    while inp != "quit":
        inp = input("Digame: ")
        if inp == "history":
            print("\n".join(map(lambda x: x.input_orig + x.result_lang, history)))
            # inp = ""
        else:
            (msg, _) = pipeline(inp, history)
            history.append(msg)
            # history.append(msg.result_en)

if __name__ == "__main__":
    main_loop()