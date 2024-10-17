import express from "express";
import { APP_ORIGIN, PORT, TEST_ORIGIN, URL } from "./env";
import cors from "cors";
import "dotenv/config";
import notesRoutes from "./routes/notes.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.listen(PORT, URL, () => {
  console.log(`Server is up and running...\nServer URL: http:${URL}:${PORT}`);
});
