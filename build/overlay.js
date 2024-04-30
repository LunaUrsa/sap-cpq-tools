"use strict";
// Check if overlay already exists, and if not, create it
// const materializeLink = document.createElement('link');
// materializeLink.href = '/node_modules/material-components-web/dist/material-components-web.css'; // Adjust path as necessary
// materializeLink.type = 'text/css';
// materializeLink.rel = 'stylesheet';
// document.head.appendChild(materializeLink);
if (!document.getElementById('overlay')) {
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay';
    overlayDiv.className = 'valign-wrapper';
    overlayDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1000;
  `;
    // Add boxes inside the overlay
    const shortcuts = [
        { name: "Go to Google", shortcut: "Ctrl+G", imageUrl: "/assets/images/icon.png" },
        { name: "Open Scripts", shortcut: "Ctrl+S", imageUrl: "/assets/images/icon.png" },
    ];
    shortcuts.forEach(item => {
        const box = document.createElement('div');
        box.className = 'card-panel';
        box.style.cssText = `
      margin: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
    `;
        const nameLabel = document.createElement('span');
        nameLabel.textContent = item.name;
        nameLabel.className = 'white-text';
        nameLabel.style.marginRight = 'auto';
        const shortcutLabel = document.createElement('span');
        shortcutLabel.textContent = item.shortcut;
        shortcutLabel.className = 'white-text';
        shortcutLabel.style.marginLeft = '10px';
        const image = new Image();
        image.src = item.imageUrl;
        image.className = 'circle';
        image.style.width = '30px';
        image.style.height = '30px';
        image.style.marginLeft = '10px';
        box.appendChild(nameLabel);
        box.appendChild(shortcutLabel);
        box.appendChild(image);
        overlayDiv.appendChild(box);
    });
    document.body.appendChild(overlayDiv);
    document.addEventListener('keydown', handleKeyDown);
}
function handleKeyDown(event) {
    switch (event.key) {
        case 's':
            if (event.ctrlKey) {
                window.open("https://example.com/scripts", "_blank"); // Opens scripts URL
            }
            break;
        case 'g':
            window.open("https://google.com", "_blank"); // Opens Google
            break;
        default:
    }
    // Remove the overlay when a second keyboard shortcut is pressed
    const overlayDiv = document.getElementById('overlay');
    if (overlayDiv) {
        overlayDiv.remove(); // Removes the overlay
    }
    document.removeEventListener('keydown', handleKeyDown);
}
//# sourceMappingURL=overlay.js.map