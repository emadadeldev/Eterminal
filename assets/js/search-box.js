(() => {
    const existingInput = document.getElementById("custom-search-box");
  
    if (existingInput) {
      existingInput.remove();
      return;
    }
  
    const input = document.createElement("input");
    input.type = "text";
    input.id = "custom-search-box";
    input.placeholder = "Search";
    input.style.position = "fixed";
    input.style.top = "50%";
    input.style.left = "50%";
    input.style.color = "black"
    input.style.transform = "translate(-50%, -50%)";
    input.style.padding = "10px 20px";
    input.style.fontSize = "18px";
    input.style.zIndex = "999999";
    input.style.border = "2px solid #333";
    input.style.borderRadius = "8px";
    input.style.width = "500px";
    input.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    input.style.backgroundColor = "#fff";
  
    document.body.appendChild(input);
    input.focus();
  
    function onClickOutside(event) {
      if (event.target !== input) {
        input.remove();
        document.removeEventListener("click", onClickOutside);
      }
    }
    document.addEventListener("click", onClickOutside);
  
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = input.value.trim();
        if (!query) return;
  
        try {
          window.open(`https://www.duckduckgo.com/?q=${encodeURIComponent(query)}`, "_blank");
        } catch {
          alert("failed to open search");
        }
  
        input.remove();
        document.removeEventListener("click", onClickOutside);
      } else if (e.key === "Escape") {
        input.remove();
        document.removeEventListener("click", onClickOutside);
      }
    });
  })();
  