console.log("Popup script loaded");
chrome.runtime.sendMessage({ action: "getTree" }, (response) => {
  if (chrome.runtime.lastError) {
    console.error("Error to recieve runtime:", chrome.runtime.lastError);
    return;
  }

  const tree = response;
  if (!tree) {
    console.log("Tree is empty");
    return;
  }

  const treeContainer = document.getElementById("tree-container");

  function printTree(node, depth = 0) {
    for (const key in node) {
      const element = document.createElement("div");
      element.style.marginLeft = `${depth * 20}px`;
      element.textContent = key;
      treeContainer.appendChild(element);
      printTree(node[key], depth + 1);
    }
  }

  printTree(tree);
});
