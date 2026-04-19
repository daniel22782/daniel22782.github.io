// MythicComedy front-end client
// Fully self-contained inside /mythicomedy

const promptInput = document.getElementById("mc-prompt");
const submitBtn = document.getElementById("mc-submit");

const p1 = document.getElementById("mc-panel1");
const p2 = document.getElementById("mc-panel2");
const p3 = document.getElementById("mc-panel3");
const p4 = document.getElementById("mc-panel4");

async function callMythicComedy(prompt) {
  const res = await fetch("https://mythicomedy.dcoleman.net/mythic-comedy/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
    throw new Error("MythicComedy API error: " + res.status);
  }

  return res.json();
}

function showPanels(panels) {
  p1.textContent = panels.panel_1_frog;
  p2.textContent = panels.panel_2_dog;
  p3.textContent = panels.panel_3_cow;
  p4.textContent = panels.panel_4_bird;

  [p1, p2, p3, p4].forEach((el, i) => {
    el.classList.remove("show");
    setTimeout(() => el.classList.add("show"), i * 120);
  });
}

submitBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Summoning...";

  try {
    const data = await callMythicComedy(prompt);
    showPanels(data.panels);
  } catch (err) {
    console.error(err);
    p1.textContent = "Error contacting MythicComedy Order.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Summon Comedy";
  }
});
