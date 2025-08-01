import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});