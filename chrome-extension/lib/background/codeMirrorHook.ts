/*
With the way extensions work, we don't have direct access to the application running on the page
So we can't directly interact with the CodeMirror instance. We can only interact with the page through the DOM.
To get around this, we can create a hidden element on the page that the content script can interact with.
This element is created via the background script, which can access the CodeMirror instance.

The extension updates the hidden element, the hidden element updates codemirror, and you can save your code to the site!
*/

export default async function codeMirrorHook() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(document.getElementsByClassName('CodeMirror')[0] as any).CodeMirror) {
    // console.error('CodeMirror instance not found');
    return;
  }

  // console.log('codeMirrorHook start')

  const updateHiddenContent = () => {
    const hiddenContent = document.getElementById('hiddenContent');
    if (hiddenContent?.textContent
      && hiddenContent.textContent.length > 0) {
      const editorElement = document.getElementsByClassName('CodeMirror')[0];
      if (editorElement) {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const editor = (editorElement as any).CodeMirror;
        if (editor && editor.getValue() !== hiddenContent.textContent) {
          editor.setValue(hiddenContent.textContent);
        }
      }
    }
  };

  const hiddenElement = document.createElement('div');
  hiddenElement.id = 'hiddenContent';
  hiddenElement.style.display = 'none';
  // Set the type as 'text/x-python', this is read by the content script to determine how to save the file
  hiddenElement.setAttribute('type', 'text/x-python');
  hiddenElement.onchange = updateHiddenContent;
  document.body.appendChild(hiddenElement);

  // Update codemirror script on page load
  updateHiddenContent();
}
