(() => {
  const existing = document.getElementById("search-overlay");
  if (existing) {
    existing.remove();
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "search-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.8)",
    zIndex: "2147483646"
  });

  const input = document.createElement("input");
  input.type = "text";
  input.id = "custom-search-box";
  input.placeholder = "Type here to search";

  Object.assign(input.style, {
    width: "400px",
    maxWidth: "90vw",
    padding: "15px 20px",
    fontSize: "14px",
    border: "2px solid #0078d7",
    borderRadius: "10px",
    outline: "none",
    boxShadow: "0 8px 15px rgba(0, 120, 215, 0.3)",
    background: "#000000ff",
    color: "#ffffff"
  });

  overlay.appendChild(input);
  document.body.appendChild(overlay);

  input.focus();

  function close() {
    overlay.remove();
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (!q) return;

      window.open(
        `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
        "_blank"
      );

      close();
    }

    if (e.key === "Escape") close();
  });
})();