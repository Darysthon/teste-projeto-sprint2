const extractButton = document.getElementById("extractButton");
const fetchButton = document.getElementById("fetchButton");
const statusDiv = document.getElementById("status");
const rssDataDiv = document.getElementById("rssData");


function showStatus(message, type = "info") {
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;
  statusDiv.style.opacity = 1;
  setTimeout(() => {
    statusDiv.style.opacity = 0;
  }, 4000);
}


extractButton.addEventListener("click", async () => {
  showStatus("Extraindo dados do RSS...", "info");

  try {
    const res = await fetch("/api/extract", {
      method: "POST"
    });

    const result = await res.json();

    if (res.ok) {
      showStatus(result.message || "Extração concluída com sucesso!", "success");
    } else {
      throw new Error(result.error || "Erro ao extrair RSS.");
    }
  } catch (error) {
    showStatus(error.message, "error");
  }
});


fetchButton.addEventListener("click", async () => {
  showStatus("Buscando dados do S3...", "info");

  try {
    const res = await fetch("/api/fetch");
    const data = await res.json();

    if (res.ok) {
      rssDataDiv.textContent = JSON.stringify(data, null, 2);
      showStatus("Dados carregados com sucesso!", "success");
    } else {
      throw new Error(data.error || "Erro ao buscar dados.");
    }
  } catch (error) {
    showStatus(error.message, "error");
  }
});