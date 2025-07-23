import { fetchRSSFeed, saveJSONToS3, getJSONFromS3 } from "../services/rssService.js";

export async function extractAndSaveRSS(req, res) {
  try {
    const data = await fetchRSSFeed();
    await saveJSONToS3(data);
    res.status(200).json({ message: "RSS salvo no S3 com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRSSFromS3(req, res) {
  try {
    const data = await getJSONFromS3();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}