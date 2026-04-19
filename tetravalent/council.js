
const ENDPOINT = "https://tetravalent.dcoleman.net/council/query";

const inputEl = document.getElementById("council-input");
const submitEl = document.getElementById("council-submit");
const statusBar = document.getElementById("status");
const statusText = document.getElementById("status-text");

const personaIds = ["Ignis", "Aeris", "Aqua", "Terra"];

const personaOutputs = {
  Ignis: document.getElementById("persona-Ignis"),
  Aeris: document.getElementById("persona-Aeris"),
  Aqua: document.getElementById("persona-Aqua"),
  Terra: document.getElementById("persona-Terra"),
};

const archivistOutputEl = document.getElementById("archivist-output");
const archivistScoreEl = document.getElementById("archivist-score");
const synthesisOutputEl = document.getElementById("synthesis-output");

function setStatus(message, mode = "idle") {
  statusText.textContent = message;
  statusBar.classList.remove("ok", "error");
  if (mode === "ok") statusBar.classList.add("ok");
  if (mode === "error") statusBar.classList.add("error");
}

function clearOutputs() {
  personaIds.forEach((id) => {
    personaOutputs[id].textContent = "";
  });
  archivistOutputEl.textContent = "";
  archivistScoreEl.textContent = "Score: —";
  synthesisOutputEl.textContent = "";
}

async function callCouncil(query) {
  const payload = { query };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function handleSubmit() {
  const query = inputEl.value.trim();
  if (!query) return;

  clearOutputs();
  submitEl.disabled = true;
  setStatus("Consulting the Council…", "idle");

  try {
    const result = await callCouncil(query);

    // Personas
    if (result.personas) {
      personaIds.forEach((id) => {
        if (result.personas[id]) {
          personaOutputs[id].textContent = result.personas[id];
        }
      });
    }

    // Archivist
    if (result.archivist) {
      archivistOutputEl.textContent = result.archivist;

      // Try to extract quality_score if present
      const match = result.archivist.match(/quality_score:\s*([0-9]+)/i);
      if (match) {
        archivistScoreEl.textContent = `Score: ${match[1]}`;
      } else {
        archivistScoreEl.textContent = "Score: —";
      }
    }

    // Synthesis
    if (result.synthesis) {
      synthesisOutputEl.textContent = result.synthesis;
    }

    setStatus("Council response received.", "ok");
  } catch (err) {
    console.error(err);
    setStatus(`Error contacting Council: ${err.message}`, "error");
  } finally {
    submitEl.disabled = false;
  }
}

submitEl.addEventListener("click", handleSubmit);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
});
