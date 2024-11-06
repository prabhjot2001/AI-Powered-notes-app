import type { Request, Response } from "express";
import { FASTAPI_URL } from "../env"; 
import axios from "axios";

// Function to generate a note
export const generateNote = async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;

   
    const response = await axios.post(`${FASTAPI_URL}/generate_note`, {
      topic: topic,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error generating note:", error);
    res.status(500).json({ error: "Failed to generate note." });
  }
};

// Function to summarize a note
export const summarizeNote = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;


    const response = await axios.post(`${FASTAPI_URL}/summarize_note`, {
      content: content,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error summarizing note:", error);
    res.status(500).json({ error: "Failed to summarize note." });
  }
};


export const answerQuestion = async (req: Request, res: Response) => {
  try {
    const { question } = req.body; 

 
    const response = await axios.post(`${FASTAPI_URL}/answer_question`, {
      question: question,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({ error: "Failed to answer question." });
  }
};


export const suggestImprovements = async (req: Request, res: Response) => {
  try {
    const { text } = req.body; 

   
    const response = await axios.post(`${FASTAPI_URL}/suggest_improvements`, {
      text: text,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error suggesting improvements:", error);
    res.status(500).json({ error: "Failed to suggest improvements." });
  }
};
