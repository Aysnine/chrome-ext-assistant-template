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

// Listen action for popup or toggle content
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {},
  });

  chrome.tabs.sendMessage(tab.id, { action: "toggle" });
});

// Listen open inner page action
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openDashboard") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("src/dashboard/index.html"),
    });
  } else if (message.action === "openSetting") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("src/setting/index.html"),
    });
  }
});
