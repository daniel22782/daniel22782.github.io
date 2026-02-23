/* ============================================================
   dcoleman.net — Navigation Logic
   Active Link Detection • Path Normalization
   PhoenixRes Doctrine: Clean, Deterministic, Minimal
   ============================================================ */

/* ------------------------------
   1. Highlight Active Navigation Link
   ------------------------------ */

(function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();

  document.querySelectorAll(".nav a").forEach(link => {
    const linkPath = link.getAttribute("href").toLowerCase();

    // Normalize both paths for matching
    const normalizedCurrent = currentPath.replace(/\/+$/, "");
    const normalizedLink = linkPath.replace(/\/+$/, "");

    if (normalizedCurrent === normalizedLink) {
      link.classList.add("active");
    }
  });
})();
