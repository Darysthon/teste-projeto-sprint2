import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import rssRoutes from "./routes/rssRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", rssRoutes);

export default app;