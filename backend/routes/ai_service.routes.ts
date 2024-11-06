import express from "express";
import VerifyUser from "../middleware/VerifyUser";
import {
  answerQuestion,
  generateNote,
  suggestImprovements,
  summarizeNote,
} from "../controllers/ai_services.controller";

const router = express.Router();

// router.use(VerifyUser);
router.post("/generate-note", generateNote);
router.post("/summarize-note", summarizeNote);
router.post("/answer-question", answerQuestion);
router.post("/suggest-improvements", suggestImprovements);

export default router;
