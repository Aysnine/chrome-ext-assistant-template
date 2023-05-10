// Test tab current page content permission
// And set popup guide if not permitted
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        function: () => {},
      });

      await chrome.action.setPopup({ tabId, popup: "" });
    } catch (error) {
      await chrome.action.setPopup({ tabId, popup: "src/popup/index.html" });
    }
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {},
  });

  // send message to content script
  chrome.tabs.sendMessage(tab.id, { action: "toggle" });
});
