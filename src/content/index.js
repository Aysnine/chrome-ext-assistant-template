const ROOT_ID = "assistant-root"; // ! CHANGE THIS VALUE FOR YOUR PROJECT

function injectRoot() {
  const rawRoot = (() => {
    const root = document.getElementById(`#${ROOT_ID}`);

    if (!root) {
      const container = document.createElement("div");
      container.id = ROOT_ID;
      container.style =
        "position: absolute; width: 0; height: 0; margin: 0; padding: 0;";
      document.body.appendChild(container);

      return container;
    }

    return root;
  })();

  rawRoot.innerHTML = "";

  const shadowRoot =
    rawRoot instanceof ShadowRoot
      ? rawRoot
      : rawRoot.attachShadow({ mode: "open" });

  return { rawRoot, shadowRoot };
}

const { rawRoot, shadowRoot: root } = injectRoot();

// Test inline style
const style = document.createElement("style");
style.innerHTML = `
.demo-container {
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 9999;
  background: #fff;
  padding: 10px;
  border: 1px solid #000;
}
`;
root.appendChild(style);

// Test fixed content
const container = document.createElement("div");
container.classList.add("demo-container");

const text = document.createElement("div");
text.innerHTML = "Hello from page content";
container.appendChild(text);

const openDashboard = document.createElement("button");
openDashboard.textContent = "Open Dashboard";
openDashboard.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openDashboard" });
});
container.appendChild(openDashboard);

const openSetting = document.createElement("button");
openSetting.textContent = "Open Setting";
openSetting.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openSetting" });
});
container.appendChild(openSetting);

root.appendChild(container);

// Test toggle display
rawRoot.style.display = "none"; // default display none
function toggleDisplay() {
  if (rawRoot.style.display === "none") {
    rawRoot.style.display = "block";
  } else {
    rawRoot.style.display = "none";
  }
}

// Listen toggle action
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle") {
    toggleDisplay();
  }
});
