document.getElementById("open-dashboard").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openDashboard" });
});
document.getElementById("open-setting").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openSetting" });
});
