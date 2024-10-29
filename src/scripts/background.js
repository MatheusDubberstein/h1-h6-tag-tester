let treeData = {};
let allHeadings = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendTree") {
    treeData = message.tree;
    console.log("Tree data received in background:", treeData);
    sendResponse({ status: "Tree data stored" });
  } else if (message.action === "getTree") {
    console.log("Popup is requesting tree data.");
    sendResponse(treeData);
  } else if (message.action === "collectHeadings") {
    allHeadings = allHeadings.concat(message.headings);
  } else if (message.action === "getAllHeadings") {
    sendResponse({ headings: allHeadings });
    allHeadings = []; // Limpar para a próxima vez
  }
  return true;
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "toggleHighlight") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlightHeadings" });
    });
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  const tabId = tab.id;
  const url = tab.url;

  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    chrome.webNavigation.getAllFrames({ tabId: tabId }, function (frames) {
      frames.forEach(function (frame) {
        chrome.scripting.executeScript({
          target: { tabId: tabId, frameIds: [frame.frameId] },
          files: ["scripts/content.js"],
        });
      });
    });
  } else {
    console.warn("A extensão não pode injetar scripts nesta página:", url);
  }
});
