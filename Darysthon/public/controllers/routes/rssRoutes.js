import express from "express";
import { extractAndSaveRSS, getRSSFromS3 } from "../controllers/rssController.js";

const router = express.Router();

router.post("/extract", extractAndSaveRSS);
router.get("/fetch", getRSSFromS3);

export default router;