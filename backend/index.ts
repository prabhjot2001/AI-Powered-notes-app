import express from "express";
import { APP_ORIGIN, PORT } from "./env";
import cors from "cors";
import "dotenv/config";
import notesRoutes from "./routes/notes.routes";

const app = express();

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(
    `Server is up and running...\nServer URL: http:localhost:${PORT}`
  );
});
