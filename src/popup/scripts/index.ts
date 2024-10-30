document.addEventListener("DOMContentLoaded", function () {
  const highlightButton = document.getElementById("highlightButton");
  if (highlightButton) {
    highlightButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "highlightHeadings" });
        }
      });
    });
  }

  let allHeadings: { text: string; level: number }[] = [];

  chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === "collectHeadings") {
      allHeadings = allHeadings.concat(request.headings);
    }
  });
});
