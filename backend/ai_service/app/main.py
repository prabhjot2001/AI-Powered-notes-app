from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()
t5_pipeline = pipeline("text2text-generation", model="t5-small")
summarizer = pipeline("summarization", model="t5-small")

# Define request and response schemas
class NoteRequest(BaseModel):
    content: str

class TopicRequest(BaseModel):
    topic: str  # Define the TopicRequest model for /create_note and /suggest

class SummaryResponse(BaseModel):
    summary: str

@app.post("/summarize", response_model=SummaryResponse)
async def summarize(request: NoteRequest):
    try:
        summary = summarizer(request.content, max_length=50, min_length=10, do_sample=False)
        return {"summary": summary[0]['summary_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/answer")
async def answer(request: NoteRequest):
    response = t5_pipeline(f"question: {request.content}")[0]['generated_text']
    return {"answer": response}

@app.post("/create_note", response_model=dict)
async def create_note(request: TopicRequest):  # Use TopicRequest here
    note = t5_pipeline(f"write about {request.topic}")[0]['generated_text']
    return {"note": note}

@app.post("/suggest", response_model=dict)
async def suggest(request: TopicRequest):  # Use TopicRequest here
    suggestion = t5_pipeline(f"suggest tips on {request.topic}")[0]['generated_text']
    return {"suggestion": suggestion}

@app.post("/chat")
async def chat(request: NoteRequest):  # Use NoteRequest for chat as well
    response = t5_pipeline(f"conversation: {request.content}")[0]['generated_text']
    return {"response": response}
