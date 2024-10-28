let treeData = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendTree") {
    treeData = message.tree;
    console.log("Tree data received in background:", treeData);
    sendResponse({ status: "Tree data stored" });
  } else if (message.action === "getTree") {
    console.log("Popup is requesting tree data.");
    sendResponse(treeData);
  }
  return true;
});
