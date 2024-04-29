document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 's') {
      window.open("https://example.com/scripts", "_blank"); // Change URL as needed
  }
});

// Close overlay on ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
      window.close();
  }
});
