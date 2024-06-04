import { useEffect } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { ZoomOutMap, Fullscreen } from '@mui/icons-material';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  const hostUrl = window.location.host;
  console.log('hostUrl:', hostUrl);


  const handleExpandEditor = () => {
    // Logic to expand editor
    console.log('Expand Editor button clicked');
    const element = document.getElementById('expandEditor');
    element?.click();
  };

  const handleFullScreenEditor = () => {
    // Logic to go full screen
    console.log('Full Screen Editor button clicked');
    const element = document.getElementById('fullScreenEditor');
    element?.click();
  };


  // const handleOpenInVSCode = async () => {
  //   // Logic to open in VSCode
  //   console.log('Open in VSCode button clicked');


  //   // let saveDirectory: FileSystemDirectoryHandle;
  //   // if (userOptions.downloadLocations) {
  //   //   console.log('Download locations:', userOptions.downloadLocations);
  //   //   // Go through each download location and see if the current window.host matches the key
  //   //   const downloadLocation = userOptions.downloadLocations[hostUrl];
  //   //   console.log('Download location:', downloadLocation);

  //   //   // Check if the user selected the Global Scripts folder, and if not, create it
  //   //   if (downloadLocation.name === 'Global Scripts') {
  //   //     saveDirectory = downloadLocation;
  //   //   } else {
  //   //     const dirName = "Global Scripts";

  //   //     // assuming we have a directory handle: 'currentDirHandle'
  //   //     saveDirectory = await downloadLocation.getDirectoryHandle(dirName, { create: true });
  //   //     console.log('saveDirectory:', saveDirectory);
  //   //   }
  //   // } else {
  //   // userOptions.downloadLocations = {};
  //   // Prompt the user to select a folder
  //   // const rootDirectory = await selectFilePath();
  //   // if (!rootDirectory) {
  //   //   alert('Please select a folder to save the file.');
  //   //   return;
  //   // }
  //   // console.log('Root Folder:', rootDirectory.name);
  //   // userOptions.downloadLocations[hostUrl] = rootDirectory;

  //   // saveToStorage('userOptions', userOptions);
  //   // setUserOptions(userOptions);

  //   // Iterate through the directory entries
  //   // for await (const entry of rootDirectory.values()) {
  //   //   if (entry.kind === 'file') {
  //   //     console.log('File:', entry.name);
  //   //     await readTextFile(entry as FileSystemFileHandle);
  //   //   } else if (entry.kind === 'directory') {
  //   //     console.log('Directory:', entry.name);
  //   //     // console.log('Resolved:', await rootDirectory.resolve(entry));

  //   //     // Handle subdirectory entry
  //   //   }
  //   // }

  //   // Check if the user selected the Global Scripts folder, and if not, create it
  //   // if (rootDirectory.name === 'Global Scripts') {
  //   //   saveDirectory = rootDirectory;
  //   // } else {
  //   //   const dirName = "Global Scripts";

  //   //   // assuming we have a directory handle: 'currentDirHandle'
  //   //   saveDirectory = await rootDirectory.getDirectoryHandle(dirName, { create: true });
  //   //   console.log('saveDirectory:', saveDirectory);
  //   // }

  //   // Get content of the codemirror and make a blob out of it, then create a URL
  //   const hiddenContent = document.getElementById('hiddenContent');
  //   console.log('hiddenContent:', hiddenContent)
  //   if (!hiddenContent) return;
  //   const editorContent = hiddenContent.textContent;
  //   if (!editorContent) return;
  //   const type = hiddenContent.getAttribute('type') ?? 'text/html';
  //   const extension = type === 'text/x-python' ? 'py' : 'txt';
  //   const blob = new Blob([editorContent], { type });
  //   const url = URL.createObjectURL(blob);


  //   // // Get the name of the script
  //   // // We get the element with the id "demo" and then get the h2 inside of that section
  //   // const scriptName = document.getElementById('demo')?.getElementsByTagName('h2')[0].textContent;
  //   // console.log('Script name:', scriptName);

  //   // const fileHandle = await saveDirectory.getFileHandle(`${scriptName}.${extension}`, { create: true });

  //   // // Create a FileSystemWritableFileStream to write to.
  //   // const writable = await fileHandle.createWritable();

  //   // // Write the contents of the file to the stream.
  //   // await writable.write(editorContent);

  //   // // Close the file and write the contents to disk.
  //   // await writable.close();

  //   chrome.downloads.download({
  //     url: url,
  //     filename: `downloaded-file.${extension}`,
  //     saveAs: false,
  //     conflictAction: 'overwrite',
  //   }, (downloadId) => {
  //     if (chrome.runtime.lastError) {
  //       console.log(' Sending error response')
  //       return;
  //     }

  //     // Listen for the download to complete
  //     chrome.downloads.onChanged.addListener(function listener(downloadDelta) {
  //       // console.log('Download delta:', downloadDelta)
  //       if (downloadDelta.id === downloadId && downloadDelta.state && downloadDelta.state.current === 'complete') {
  //         // console.log('Download complete:', downloadDelta)
  //         chrome.downloads.search({ id: downloadId }, (results) => {
  //           if (results && results.length > 0) {
  //             console.log('Download item:', results[0])
  //             console.log('Sending message to content script: downloadComplete')
  //             console.log('Sending success response')
  //           }
  //         });
  //         // Remove the listener once the download is complete
  //         chrome.downloads.onChanged.removeListener(listener);
  //       }
  //     });
  //   });

  //   // console.log('Sending message to background script:', url);
  //   // try {
  //   //   chrome.runtime.sendMessage({
  //   //     action: 'download',
  //   //     url: url,
  //   //     filename: `downloaded-file.${extension}`,
  //   //     revokeUrl: true // Indicate that the URL should be revoked after download
  //   //   }, (response) => {
  //   //     console.log('Download started with ID:', response);
  //   //     const vscodeLink = `vscode://file/${encodeURIComponent(response.filePath)}`;
  //   //     window.location.href = vscodeLink;
  //   //   });
  //   // } catch (error) {
  //   //   console.error('Error:', error);
  //   // }
  // };

  // const readTextFile = async (fileHandle: FileSystemFileHandle) => {
  //   const file = await fileHandle.getFile();
  //   const text = await file.text();
  //   console.log('File content:', text);
  // };

  // const selectFilePath = async (): Promise<FileSystemDirectoryHandle | null> => {
  //   try {
  //     if ('showDirectoryPicker' in window) {
  //       console.log('Directory Picker API is supported in this browser.');

  //       // This does NOT work in the html of the popup for some reason
  //       // https://issues.chromium.org/issues/40240444
  //       const directoryHandle = await window.showDirectoryPicker({
  //         id: 'hostdotcom',
  //         mode: 'readwrite',
  //         startIn: 'desktop'
  //       });
  //       // console.log('Directory handle:', directoryHandle);
  //       // console.log('Directory handles:', directoryHandle.values());
  //       // console.log('Directory handles resolved:', await directoryHandle.resolve(directoryHandle));

  //       // Check for permissions
  //       const permissionStatus = await directoryHandle.queryPermission({ mode: 'readwrite' });
  //       console.log('Permission status:', permissionStatus);

  //       if (permissionStatus === 'denied') {
  //         console.error('Permission to access directories was denied.');
  //         return null;
  //       }

  //       if (permissionStatus === 'prompt') {
  //         const requestStatus = await directoryHandle.requestPermission({ mode: 'readwrite' });
  //         console.log('Request permission status:', requestStatus);
  //         if (requestStatus === 'denied') {
  //           console.error('Permission to access directories was denied.');
  //           return null;
  //         }
  //       }

  //       return directoryHandle;

  //     } else {
  //       console.error('Directory Picker API is not supported in this browser.');
  //     }
  //   } catch (error) {
  //     console.error('Error selecting directory:', error);
  //   }
  //   return null;
  // };

  // const pullFromFileSystem = async () => {
  //   console.log('Pulling from file system');

  //   // Get the name of the script
  //   // We get the element with the id "demo" and then get the h2 inside of that section
  //   const scriptName = document.getElementById('demo')?.getElementsByTagName('h2')[0].textContent;
  //   console.log('Script name:', scriptName);

  //   if (userOptions.downloadLocations) {
  //     console.log('Download locations:', userOptions.downloadLocations);
  //     // Go through each download location and see if the current window.host matches the key
  //     const downloadLocation = userOptions.downloadLocations[hostUrl];
  //     console.log('Download location:', downloadLocation);

  //     // Pull the file from the downloadLocation + scriptName
  //     // If the file is not found, prompt the user to select a file
  //     // If the file is found, read the file and update the editor content
  //   }

  //   try {
  //     const fileHandle = await selectFilePath();
  //     if (!fileHandle) return;
  //     console.log('File handle:', fileHandle.values());
  //     // chrome.runtime.sendMessage({
  //     //   action: 'download',
  //     //   url: url,
  //     //   filename: `downloaded-file.${extension}`,
  //     //   revokeUrl: true // Indicate that the URL should be revoked after download
  //     // }, (response) => {
  //     //   console.log('Download started with ID:', response);
  //     //   const vscodeLink = `vscode://file/${encodeURIComponent(response.filePath)}`;
  //     //   window.location.href = vscodeLink;
  //     // });

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
      {/* <Tooltip title="Open in VSCode">
        <IconButton size="small" onClick={handleOpenInVSCode} style={{ width: '40px', height: '40px' }}>
          <OpenInBrowser fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Pull from VSCode">
        <IconButton size="small" onClick={pullFromFileSystem} style={{ width: '40px', height: '40px' }}>
          <Upload fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip> */}
      <Tooltip title="Expand Editor">
        <IconButton id='expandEditorMUI' size="small" onClick={handleExpandEditor} style={{ width: '40px', height: '40px' }}>
          <ZoomOutMap fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Full Screen Editor">
        <IconButton id='fullScreenEditorMUI' size="small" onClick={handleFullScreenEditor} style={{ width: '40px', height: '40px' }}>
          <Fullscreen fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
