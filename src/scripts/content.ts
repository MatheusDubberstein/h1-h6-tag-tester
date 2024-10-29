interface HeadingColors {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

interface Heading {
  text: string;
  level: number;
}

// Convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getHeadings(): Heading[] {
  const headings: Heading[] = [];
  const nodes = document.querySelectorAll<HTMLHeadingElement>(
    "h1, h2, h3, h4, h5, h6",
  );
  nodes.forEach(function (node) {
    headings.push({
      text: node.innerText.trim(),
      level: parseInt(node.tagName.substring(1)),
    });
  });

  return headings;
}

function highlightHeadingsInDocument(
  doc: Document,
  colors: HeadingColors,
): void {
  const styleId = "headingHighlightStyle";
  let style = doc.getElementById(styleId) as HTMLStyleElement | null;

  if (!style) {
    style = doc.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      h1, h2, h3, h4, h5, h6 {
        position: relative !important;
        outline-offset: -2px !important; 
      }
      .heading-badge {
        position: absolute;
        top: -1rem;
        right: 0px;
        background-color: #000;
        color: #fff;
        padding: 2px 5px;
        font-size: 12px;
        border-radius: 3px;
        z-index: 9999;
        pointer-events: none;
      }
      h1 .heading-badge {
        background-color: ${colors.h1};
      }
      h2 .heading-badge {
        background-color: ${colors.h2};
      }
      h3 .heading-badge {
        background-color: ${colors.h3};
      }
      h4 .heading-badge {
        background-color: ${colors.h4};
      }
      h5 .heading-badge {
        background-color: ${colors.h5};
      }
      h6 .heading-badge {
        background-color: ${colors.h6};
      }
      h1 {
        outline: 2px dashed ${colors.h1} !important;
        background-color: ${hexToRgba(colors.h1, 0.2)} !important;
      }
      h2 {
        outline: 2px dashed ${colors.h2} !important;
        background-color: ${hexToRgba(colors.h2, 0.2)} !important;
      }
      h3 {
        outline: 2px dashed ${colors.h3} !important;
        background-color: ${hexToRgba(colors.h3, 0.2)} !important;
      }
      h4 {
        outline: 2px dashed ${colors.h4} !important;
        background-color: ${hexToRgba(colors.h4, 0.2)} !important;
      }
      h5 {
        outline: 2px dashed ${colors.h5} !important;
        background-color: ${hexToRgba(colors.h5, 0.2)} !important;
      }
      h6 {
        outline: 2px dashed ${colors.h6} !important;
        background-color: ${hexToRgba(colors.h6, 0.2)} !important;
      }
    `;
    // Add sytle to head
    doc.head.appendChild(style);
    // Add badge to headings
    const headings = doc.querySelectorAll<HTMLHeadingElement>(
      "h1, h2, h3, h4, h5, h6",
    );
    headings.forEach(function (heading) {
      const badge = doc.createElement("div");
      badge.className = "heading-badge";
      badge.textContent = heading.tagName;
      heading.style.position = "relative";
      heading.style.overflow = "visible"; // avoid clipping badge
      heading.appendChild(badge);
    });
  } else {
    // Remove style
    style.remove();
    // Remove badge from headings
    const badges = doc.querySelectorAll(".heading-badge");
    badges.forEach(function (badge) {
      if (badge.parentElement) {
        badge.parentElement.removeChild(badge);
      }
    });
  }
}

function highlightHeadings(): void {
  const colors = {
    h1: "#F7768E",
    h2: "#9ECE6A",
    h3: "#E0AF68",
    h4: "#7AA2F7",
    h5: "#BB9AF7",
    h6: "#7DCFFF",
  };
  highlightHeadingsInDocument(document, colors);
}

// message listener
chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.action === "getHeadings") {
    const headings = getHeadings();
    sendResponse({ headings: headings });
  } else if (request.action === "highlightHeadings") {
    highlightHeadings();
  }
});

chrome.runtime.sendMessage({
  action: "collectHeadings",
  headings: getHeadings(),
});
