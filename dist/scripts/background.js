"use strict";
let allHeadings = [];
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.action === "collectHeadings") {
        allHeadings = allHeadings.concat(message.headings);
    }
    else if (message.action === "getAllHeadings") {
        sendResponse({ headings: allHeadings });
        allHeadings = [];
    }
    return true;
});
chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggleHighlight") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "highlightHeadings" });
            }
        });
    }
});
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const tabId = tab.id;
    const url = tab.url;
    if (tabId === undefined)
        return;
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        chrome.webNavigation.getAllFrames({ tabId }, function (frames) {
            if (!frames)
                return;
            frames.forEach(function (frame) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId, frameIds: [frame.frameId] },
                    files: ["scripts/content.js"],
                });
            });
        });
    }
    else {
        console.warn("The extension not run in this page:", url);
    }
});
