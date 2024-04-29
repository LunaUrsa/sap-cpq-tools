console.log("Overlay script loaded");

// Check if overlay already exists
if (!document.getElementById('overlay')) {
  const overlayDiv = document.createElement('div');
  overlayDiv.id = 'overlay';
  overlayDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 24px;
  `;
  overlayDiv.textContent = 'Press Ctrl+S to go to scripts URL or ESC to close.';

  document.body.appendChild(overlayDiv);

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        const overlayDiv = document.getElementById('overlay');
        if (overlayDiv) {
            overlayDiv.remove(); // Simpler and avoids the need to reference the parent node
        }
    } else if (event.key === 'g') {
        window.open("https://google.com", "_blank"); // Change URL as needed
    }
});
}
