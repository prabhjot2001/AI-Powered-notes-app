import express from "express";
import { APP_ORIGIN, PORT, TEST_ORIGIN, URL } from "./env";
import cors from "cors";
import "dotenv/config";
import notesRoutes from "./routes/notes.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const port = parseInt(PORT);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);

app.listen(port, URL, () => {
  console.log(`Server is up and running...\nServer URL: http:${URL}:${port}`);
});
