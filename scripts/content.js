const h1tags = document.querySelectorAll("h1");
const h2tags = document.querySelectorAll("h2");
const h3tags = document.querySelectorAll("h3");
const h4tags = document.querySelectorAll("h4");
const h5tags = document.querySelectorAll("h5");
const h6tags = document.querySelectorAll("h6");
const colors = {
  h1: { bg: "#f8d7da", text: "#721c24" },
  h2: { bg: "#d4edda", text: "#155724" },
  h3: { bg: "#cce5ff", text: "#004085" },
  h4: { bg: "#fff3cd", text: "#856404" },
  h5: { bg: "#d1ecf1", text: "#0c5460" },
  h6: { bg: "#f7e4d7", text: "#723f1c" },
};
function highlightTags(elements, tag) {
  elements.forEach((element) => {
    //  Create title element
    const title = document.createElement("strong");
    //  Position Title
    title.style.position = "absolute";
    title.style.top = "-1.8rem";
    title.style.left = "0.5rem";
    title.style.height = "2rem";
    // center title content
    title.style.display = "flex";
    title.style.alignItems = "center";
    title.style.justifyContent = "center";
    // style title
    title.style.backgroundColor = `${colors[tag].bg}80`; // 50% opacity
    title.style.color = colors[tag].text;
    title.style.fontSize = "0.75rem";
    title.style.padding = "0 0.5rem";
    title.style.borderRadius = "0.25rem";
    title.style.fontWeight = "bold";
    // set title content
    title.textContent = tag.toUpperCase();

    // set position to relative
    element.style.position = "relative";
    element.style.background = `${colors[tag].bg}4D`; // 30% opacity
    element.style.border = `0.125rem dashed ${colors[tag].bg}`;
    element.style.boxSize = "border-box";
    // Append elements
    element.appendChild(title);
  });
}

if (h1tags) {
  highlightTags(h1tags, "h1");
}
if (h2tags) {
  highlightTags(h2tags, "h2");
}
if (h3tags) {
  highlightTags(h3tags, "h3");
}
if (h4tags) {
  highlightTags(h4tags, "h4");
}
if (h5tags) {
  highlightTags(h5tags, "h5");
}
if (h6tags) {
  highlightTags(h6tags, "h6");
}
