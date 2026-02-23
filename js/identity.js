/* ============================================================
   dcoleman.net — Identity Layer
   Realm Awareness • Theming • Active Navigation
   PhoenixRes Doctrine: Minimal, Deterministic, Intentional
   ============================================================ */

/* ------------------------------
   1. Apply Realm Theme
   ------------------------------ */

(function applyRealmTheme() {
  const body = document.body;
  const realm = body.dataset.realm;

  if (!realm) return;

  switch (realm.toLowerCase()) {
    case "phoenixres":
      body.classList.add("theme-phoenix");
      break;

    case "ascendantcore":
      body.classList.add("theme-ascendant");
      break;

    case "ascendantstudio":
      body.classList.add("theme-ascendant");
      break;

    case "wondercave":
      body.classList.add("theme-wondercave");
      break;

    case "emberstrike":
      // EmberStrike can get its own theme later
      break;

    case "lineage":
      // Lineage can inherit PhoenixRes or get its own later
      break;

    default:
      console.warn("Unknown realm:", realm);
  }
})();
