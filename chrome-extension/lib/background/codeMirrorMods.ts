import { EditorConfiguration } from "codemirror";



export default async function codeMirrorMods(codeMirrorOptions: CodeMirrorOptions) {
  // console.log('Changing code with these options:', codeMirrorOptions)

  // Wait for the DOM to be fully loaded
  // Retry mechanism to ensure CodeMirror instance is available
  const maxRetries = 10;
  let retries = 0;
  let editor: CodeMirror.Editor | undefined;

  const codeMirrorVersion = "5.65.16";

  const loadScript = (url: string) => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const loadCSS = (url: string) => {
    return new Promise<void>((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      link.onload = () => resolve();
      document.body.appendChild(link);
    });
  };

  while (retries < maxRetries && !editor) {
    const editorElement = document.getElementsByClassName('CodeMirror')[0];
    // console.log('Editor element:', editorElement)
    if (editorElement) {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      editor = (editorElement as any).CodeMirror;
      // console.log('Editor:', editor)
      if (editor) {
        break;
      }
    }

    retries++;
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retrying
  }

  if (!editor) {
    console.error('CodeMirror instance not found after retries');
    return;
  }

  const hosts = ["cpq.cloud.sap", "codemirror.net"]
  const host = window.location.host;

  if (!hosts.some(h => new RegExp(h).test(host))) {
    console.log('Host not matched:', host);
    return;
  }
  // console.log('Host matched:', host)

  const gutters = ["CodeMirror-linenumbers"];

  // Cold folding
  if (codeMirrorOptions.foldGutter) {
    gutters.push("CodeMirror-foldgutter");

    const foldScripts = [
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/brace-fold.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/comment-fold.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/foldcode.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/foldgutter.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/indent-fold.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/markdown-fold.min.js`,
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/xml-fold.min.js`,
    ].map(loadScript);

    const foldCSS = [
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/fold/foldgutter.min.css`,
    ].map(loadCSS);

    await Promise.all([...foldScripts, ...foldCSS]);

  }

  // Themes
  if (!["default", "light", "dark"].includes(codeMirrorOptions.theme)) {
    // Append CSS to the head
    // console.log(`Adding ${codeMirrorOptions.theme} theme CSS`)

    const themeCSS = [
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/theme/${codeMirrorOptions.theme}.min.css`,
    ].map(loadCSS);

    await Promise.all([...themeCSS]);
  }

  // Linting
  if (codeMirrorOptions.linting) {
    // gutters.push("CodeMirror-foldgutter");

    const lintScripts = [
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/lint/css-lint.min.js`,
    ].map(loadScript);

    // CSS Urls to load
    const listCss = [
      `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/addon/lint/lint.min.css`
    ].map(loadCSS);

    await Promise.all([...lintScripts, ...listCss]);
  }

  editor.setOption('gutters', gutters);
  console.log('Gutters set:', gutters)

  const options = Object.entries(codeMirrorOptions).map(([key, value]) => {
    return new Promise<void>((resolve) => {
      if (!editor) return;
      // console.log('Setting option:', key, value);
      try {
        editor.setOption(key as keyof EditorConfiguration, value);
      } catch (error) {
        console.error('Failed to set option:', key, value, error);
      }
      resolve();
    });
  });

  await Promise.all(options)

  console.log('CodeMirror options applied:', codeMirrorOptions)

  return true;
}