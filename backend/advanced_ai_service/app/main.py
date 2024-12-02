from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Load GPT-2 Large model and tokenizer
model_name = "gpt2-large"  # Using GPT-2 Large model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define request and response data models
class TextRequest(BaseModel):
    text: str

class QuestionRequest(BaseModel):
    question: str

class TopicRequest(BaseModel):
    topic: str

class SummaryRequest(BaseModel):
    content: str

class SummaryResponse(BaseModel):
    summary: str

@app.post("/generate_note")
async def generate_note(request: TopicRequest):
    prompt = f"Explain in detail and concisely how the following works: {request.topic}."
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate the note with refined settings for focused output, most optimized setting after trying different
    outputs = model.generate(
        inputs.input_ids,
        max_length=200,
        num_beams=3,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.9,
        temperature=0.7,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id,
        early_stopping=True
    )

    note = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"note": note}

@app.post("/summarize_note", response_model=SummaryResponse)
async def summarize_note(request: SummaryRequest):
    prompt = f"Summarize the following note: {request.content}"
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate the summary with updated settings
    outputs = model.generate(
        inputs.input_ids,
        max_length=500,
        num_beams=5,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id,
        early_stopping=True
    )
    
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"summary": summary}

@app.post("/answer_question")
async def answer_question(request: QuestionRequest):
    prompt = f"Answer the question: {request.question}"
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate the answer with updated settings
    outputs = model.generate(
        inputs.input_ids,
        max_length=100,
        num_beams=5,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id,
        early_stopping=True
    )
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"answer": answer}

@app.post("/suggest_improvements")
async def suggest_improvements(request: TextRequest):
    prompt = f"Suggest improvements for: {request.text}"
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate suggestions with updated settings
    outputs = model.generate(
        inputs.input_ids,
        max_length=100,
        num_beams=5,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id,
        early_stopping=True
    )
    suggestions = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"suggestions": suggestions}
