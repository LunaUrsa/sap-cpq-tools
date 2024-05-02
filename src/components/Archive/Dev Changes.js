/* eslint-disable no-undef */
/*
 ** Version 1.0.1
 **
 ** This script is intended to be loaded into CPQ and Workflow
 ** Use an addon like 'User Javascript and CSS'
 ** The companion CSS file is necessary to have.
 **
 ** Authors: Tony House, Lawrence Clark and Eric Hoftiezer
 **
 ** For changes please contact Eric Hoftiezer.
 **
 */

// Declare global variables
const host = window.location.host;
// If we're inside CPQ
// TODO: Make a list variable so we can quickly add hosts.
const isCPQ = host.includes("webcomcpq");
// If we're in workflow
const isWorkflow =
  host.includes("webcomserver") || host.includes("callidusondemand");

function addInternalOptions() {
  // Create an button the user can click to change options on the page
  const optionsButton = document.createElement("a");
  optionsButton.type = "button";
  optionsButton.setAttribute("data-toggle", "collapse");
  optionsButton.setAttribute("data-target", "#menuDiv");
  optionsButton.setAttribute("aria-expanded", "false");
  optionsButton.setAttribute("aria-controls", "menuDiv");
  optionsButton.href = "#";
  optionsButton.role = "button";
  optionsButton.innerText = "IWS";
  optionsButton.style = "font-weight: bold;";

  var cpqButtonBar = document.getElementsByClassName(
    "col-sm-6 control-label text-right",
  )[0];
  if (cpqButtonBar) {
    optionsButton.classList.add("btn");
    optionsButton.classList.add("btn-primary");
    optionsButton.classList.add("btn-sm");
    // optionsButton.classList.add('optsButton')
    optionsButton.id = "optsButton";
    cpqButtonBar.appendChild(optionsButton);
  }

  var workflowNavBar = document.getElementById("mainadminmenu");
  if (workflowNavBar) {
    var navBarList = workflowNavBar.children[0];
    var optionsLi = document.createElement("li");
    optionsLi.id = "menuItem_iws";
    optionsLi.appendChild(optionsButton);
    navBarList.appendChild(optionsLi);

    $("#menuItem_iws").click(function () {
      var x = document.getElementById("wfOptionsToolbar");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    });
  }

  // Create our internal options menu
  const optionsToolbar = document.createElement("div");
  optionsToolbar.className = "collapse";
  // optionsToolbar.role = 'toolbar'
  optionsToolbar.id = "menuDiv";

  const cpqScriptToolbar = document.getElementsByClassName("script-toolbar")[0];
  if (cpqScriptToolbar) {
    optionsToolbar.className = "collapse menuDiv col-1 btn-toolbar";
    cpqScriptToolbar.insertAdjacentElement("beforebegin", optionsToolbar);
  }

  if (workflowNavBar) {
    // optionsToolbar.style = "display: none;"

    wfTd = workflowNavBar.parentNode;
    wfTr = wfTd.parentNode;
    wfTbody = wfTr.parentNode;

    wfNewTd = document.createElement("td");
    wfNewTd.style = "height: 45px;";

    wfNewTd.appendChild(optionsToolbar);

    wfNewTr = document.createElement("tr");
    wfNewTr.id = "wfOptionsToolbar";
    wfNewTr.style = "height: 45px; display: none;";
    wfNewTr.appendChild(wfNewTd);

    wfTbody.appendChild(wfNewTr);
  }
}

function viewSelector() {
  function changeView() {
    const viewSlct = document.getElementById("viewPickSlct");
    const selectedView = viewSlct.options[viewSlct.selectedIndex].text;
    if (selectedView) {
      var buttonBar = document.getElementsByClassName(
        "col-sm-6 control-label text-right",
      )[0];
      if (selectedView === "Default") {
        const codeWindow = document.getElementsByClassName("CodeMirror")[0];

        // Undo side by side format
        codeWindow.classList.remove("col-sm-6");
        codeWindow.classList.remove("col-md-6");
        codeWindow.classList.remove("leftscript");

        // Undo narrow trace format
        codeWindow.classList.remove("col-sm-8");
        codeWindow.classList.remove("col-md-8");
        codeWindow.classList.remove("largeleft");

        // Remove row formatting
        codeWindow.parentNode.classList.remove("rowheight_win");
        codeWindow.parentNode.classList.remove("row");

        // Remove trace formatting
        const traceWindow = document.getElementById("tracesContainer");
        // Remove right formatting
        traceWindow.classList.remove("righttrace");
        // Remove side by side format
        traceWindow.classList.remove("col-sm-6");
        traceWindow.classList.remove("col-md-6");
        // Remove narrow trace
        traceWindow.classList.remove("col-md-4");
        traceWindow.classList.remove("col-sm-4");
        traceWindow.classList.add("col-md-12");
        traceWindow.classList.add("col-sm-12");

        const clearTrace = document.getElementById("traceControl");
        clearTrace.remove();

        const traceTitle = document.getElementsByClassName("tracetitle")[0];
        traceTitle.style = "";

        traceTitle.insertAdjacentElement("afterend", traceWindow);
      }
      if (selectedView === "Side By Side") {
        const codeWindow = document.getElementsByClassName("CodeMirror")[0];
        // Undo narrow trace format
        codeWindow.classList.remove("col-sm-8");
        codeWindow.classList.remove("col-md-8");
        codeWindow.classList.remove("largeleft");

        // Format the codeWindow to have the leftscript class
        // This shoves it to the left and sets it to 50% width.
        codeWindow.classList.add("col-sm-6");
        codeWindow.classList.add("col-md-6");
        codeWindow.classList.add("leftscript");

        // Set the entire code panel to have a larger height and the "row" class
        // This is so we can put the Trace window next to it in the same 'row'
        codeWindow.parentNode.classList.add("rowheight_win");
        codeWindow.parentNode.classList.add("row");

        // Moves the trace window to the same row as the code window
        // Gives it a 50% width and aligns RIGHT
        const traceWindow = document.getElementById("tracesContainer");

        // Remove default format
        traceWindow.classList.remove("col-md-12");
        traceWindow.classList.remove("col-sm-12");
        // Remove narrow trace
        traceWindow.classList.remove("col-md-4");
        traceWindow.classList.remove("col-sm-4");
        traceWindow.classList.remove("smallright");

        traceWindow.classList.add("righttrace");
        traceWindow.classList.add("col-sm-6");
        traceWindow.classList.add("col-md-6");

        codeWindow.insertAdjacentElement("afterend", traceWindow);

        const existingClearTraceButton =
          document.getElementById("traceControl");
        if (!existingClearTraceButton) {
          // Create the "Clear Traces" button and add it after the script toolbar
          // const clearTrace = document.createElement('div')
          const clearTrace = document.createElement("a");
          clearTrace.className = "btn btn-primary btn-sm traceControl";
          clearTrace.href = "";
          clearTrace.role = "button";
          clearTrace.innerText = "Clear Traces";
          clearTrace.id = "traceControl";
          clearTrace.setAttribute("data-bind", "click: clearTraces");

          buttonBar.appendChild(clearTrace);
        }

        const traceTitle = document.getElementsByClassName("tracetitle")[0];
        traceTitle.style = "display: none;";
      }
      if (selectedView === "Narrow Trace") {
        const codeWindow = document.getElementsByClassName("CodeMirror")[0];
        // Undo side by side format
        codeWindow.classList.remove("col-sm-6");
        codeWindow.classList.remove("col-md-6");
        codeWindow.classList.remove("leftscript");

        // Format the codeWindow to have the leftscript class
        // This shoves it to the left and sets it to 80% width.
        codeWindow.classList.add("col-sm-8");
        codeWindow.classList.add("col-md-8");
        codeWindow.classList.add("largeleft");

        // Set the entire code panel to have a larger height and the "row" class
        // This is so we can put the Trace window next to it in the same 'row'
        codeWindow.parentNode.classList.add("rowheight_win");
        codeWindow.parentNode.classList.add("row");

        // Moves the trace window to the same row as the code window
        // Gives it a 30% width and aligns RIGHT
        const traceWindow = document.getElementById("tracesContainer");

        // Remove default format
        traceWindow.classList.remove("col-md-12");
        traceWindow.classList.remove("col-sm-12");
        // Remove side by side format
        traceWindow.classList.remove("col-md-6");
        traceWindow.classList.remove("col-sm-6");
        traceWindow.classList.remove("righttrace");

        traceWindow.classList.add("smallright");
        traceWindow.classList.add("col-sm-4");
        traceWindow.classList.add("col-md-4");

        codeWindow.insertAdjacentElement("afterend", traceWindow);

        const existingClearTraceButton =
          document.getElementById("traceControl");
        if (!existingClearTraceButton) {
          // Create the "Clear Traces" button and add it after the script toolbar
          // const clearTrace = document.createElement('div')
          const clearTrace = document.createElement("a");
          clearTrace.className = "btn btn-primary btn-sm traceControl";
          clearTrace.href = "";
          clearTrace.role = "button";
          clearTrace.innerText = "Clear Traces";
          clearTrace.id = "traceControl";
          clearTrace.setAttribute("data-bind", "click: clearTraces");

          buttonBar.appendChild(clearTrace);
        }

        const traceTitle = document.getElementsByClassName("tracetitle")[0];
        traceTitle.style = "display: none;";
      }
    }
    localStorage.setItem("selectedView", selectedView);
  }

  viewList = ["Default", "Side By Side", "Narrow Trace"];

  const viewPick = document.createElement("div");
  viewPick.className = "form-group";
  viewPick.id = "viewPickDiv";
  viewPick.style = "float: left; margin-right: 10px";
  const viewPickLabel = document.createElement("label");
  viewPickLabel.for = "viewPickSlct";
  viewPickLabel.innerText = "Select View:";

  const viewPickSelect = document.createElement("select");
  viewPickSelect.className = "form-control";
  viewPickSelect.id = "viewPickSlct";
  viewPickSelect.style = "width: auto";
  viewList.forEach((element) => {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(element));
    opt.value = element;
    viewPickSelect.appendChild(opt);
  });

  viewPick.appendChild(viewPickLabel);
  viewPick.appendChild(viewPickSelect);
  const optionsToolbar = document.getElementById("menuDiv");
  optionsToolbar.appendChild(viewPick);

  $("#viewPickSlct").on("change", function () {
    changeView();
  });

  var currentView = localStorage.getItem("selectedView");
  if (currentView && currentView !== "Default") {
    document.getElementById("viewPickSlct").value = currentView;
    changeView();
  }
}

function themeSelector() {
  function changeTheme(previousTheme, defaultTheme) {
    var codeMirror = document.getElementsByClassName("CodeMirror")[0];
    var traceMirror = document.getElementsByClassName("CodeMirror")[1];

    if (defaultTheme) {
      var className = "cm-s-" + defaultTheme;
      codeMirror.classList.add(className);
      if (traceMirror) {
        traceMirror.classList.add(className);
      }
      return;
    }

    var previousThemeClass = "cm-s-" + previousTheme;
    codeMirror.classList.remove(previousThemeClass);
    if (traceMirror) {
      traceMirror.classList.remove(previousThemeClass);
    }
    const themeSlct = document.getElementById("themePickSlct");
    const selectedTheme = themeSlct.options[themeSlct.selectedIndex].text;
    if (selectedTheme !== "default") {
      const className = "cm-s-" + selectedTheme;
      codeMirror.classList.add(className);
      if (traceMirror) {
        traceMirror.classList.add(className);
      }
    }
    localStorage.setItem("selectedTheme", selectedTheme);
  }

  const themeList = [
    "default",
    "3024-day",
    "3024-night",
    "abcdef",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-dark",
    "bespin",
    "base16-light",
    "blackboard",
    "cobalt",
    "colorforth",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "elegant",
    "erlang-dark",
    "gruvbox-dark",
    "hopscotch",
    "icecoder",
    "isotope",
    "lesser-dark",
    "liquibyte",
    "lucario",
    "material",
    "material-darker",
    "material-palenight",
    "material-ocean",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "moxer",
    "neat",
    "neo",
    "night",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-dark",
    "paraiso-light",
    "pastel-on-dark",
    "railscasts",
    "rubyblue",
    "seti",
    "shadowfox",
    "solarized",
    "the-matrix",
    "tomorrow-night-bright",
    "tomorrow-night-eighties",
    "ttcn",
    "twilight",
    "vibrant-ink",
    "xq-dark",
    "xq-light",
    "yeti",
    "idea",
    "darcula",
    "yonce",
    "zenburn",
  ];

  themeList.forEach((element) => {
    $("body").append("<link>");
    var css = $("body").children(":last");
    var url = "https://codemirror.net/theme/" + element + ".css";
    css.attr({
      rel: "stylesheet",
      type: "text/css",
      href: url,
    });
  });

  const themePickDiv = document.createElement("div");
  themePickDiv.className = "form-group floatRight";
  themePickDiv.id = "themePickDiv";
  themePickDiv.style = "margin-right: 10px";

  const themePickLabel = document.createElement("label");
  themePickLabel.for = "themePickSlct";
  themePickLabel.innerText = "Select Theme:";

  const themePickSelect = document.createElement("select");
  themePickSelect.className = "form-control floatRight";
  themePickSelect.id = "themePickSlct";
  themePickSelect.style = "width: auto";
  themeList.forEach((element) => {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(element));
    opt.value = element;
    themePickSelect.appendChild(opt);
  });
  const workflowScriptIde = document.getElementById("script-ide-tabs");
  if (workflowScriptIde) {
    $(".head.scriptsNavigationDiv").append(themePickSelect);
  } else {
    themePickDiv.appendChild(themePickLabel);
    themePickDiv.appendChild(themePickSelect);
    const optionsToolbar = document.getElementById("menuDiv");
    optionsToolbar.appendChild(themePickDiv);
  }

  var previousTheme;
  $("#themePickSlct")
    .on("click", function () {
      previousTheme = this.value;
    })
    .change(function () {
      changeTheme(previousTheme);
      // // Make sure the previous value is updated
      previousTheme = this.value;
    });

  var currentTheme = localStorage.getItem("selectedTheme");
  if (currentTheme && currentTheme !== "default") {
    document.getElementById("themePickSlct").value = currentTheme;
    changeTheme("", currentTheme);
  }
}

function codeFolding() {
  // Addon imports
  $("body").append(
    '<script src ="https://codemirror.net/addon/fold/brace-fold.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/comment-fold.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/foldcode.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/foldgutter.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/indent-fold.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/markdown-fold.js"></script>' +
      '<script src ="https://codemirror.net/addon/fold/xml-fold.js"></script>',
  );

  $("head").append("<link>");
  var css = $("head").children(":last");
  css.attr({
    rel: "stylesheet",
    type: "text/css",
    href: "https://codemirror.net/addon/fold/foldgutter.css",
  });

  // The 'fromTextArea' function would create a new instance of CodeMirror
  // and add it to the page. We don't want to replace the existing menu if We
  // don't need to. For one, if you refresh the page then you lose your code,
  // so we would need to completely re-build the editor. Sounds like a hassle.
  // That said, if we need to re-build a better code-editor, we probably could.
  // Honestly at this point ive spent hours trying to figure this out, it would
  // probably be easier to do this instead.

  // This does effect the editor in some way.
  // The tabSize parameter changes how large tabs are
  //

  // var fromTextAreaEditor = CodeMirror.fromTextArea(textArea, {
  //    mode: "python",
  //    lineNumbers: false,
  //    extraKeys: {"Ctrl-M": function(cm){ cm.foldCode(cm.getCursor()); }},
  //    foldGutter: true,
  //    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  //    theme: 'midnight'
  // });

  // var CMDocumenBodyEditor = CodeMirror(document.body, {
  //    // mode: "python",
  //    // lineNumbers: true,
  //    // extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  //    theme: 'midnight',
  //    foldGutter: true,
  //    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  // });

  // To get the 'textArea' element we need to find the Code Mirror element,
  // get CM's paren't element, and then get the 'textarea' element' under that parent.

  // const codeWindow = document.getElementsByClassName('CodeMirror')[0]
  // const codeWindowParent = codeWindow.parentNode
  // const textArea = codeWindowParent.getElementsByTagName("textarea")[0];
  // var CMTextAreaEditor = CodeMirror(textArea, {
  //    mode: "python",
  //    lineNumbers: false,
  //    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  //    theme: 'midnight',
  //    foldGutter: true,
  //    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  // });

  // This does effect the editor in some way.
  // The tabSize parameter changes how large tabs are
  //
  // var editor = document.querySelector('.CodeMirror').CodeMirror;
  // editor.options.tabSize = 20
  // editor.options.indentUnit = 20
  // editor.options.lineNumbers = false
  // editor.options.extraKeys = {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  // editor.options.foldGutter = true
  // editor.options.theme = 'midnight'
  // editor.options.gutters = ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]

  // This doesn't error, but im not sure if it's doing anything
  //
  // editor = CodeMirror
  // editor.defaults.theme = 'midnight'
  // editor.defaults.foldGutter = true
  // editor.defaults.gutters = ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  // editor.defaults.tabSize = 20

  // editor.setOption('test','test')

  // console.log("editor:")
  // console.log(editor)
  // console.log('cm:')
  // console.log(document.querySelector('.CodeMirror').CodeMirror)
  // console.log("CodeMirror")
  // console.log(CodeMirror)

  // This never works
  // editor.foldCode(CodeMirror.Pos(0, 0));
}

function prodWarning() {
  var host = window.location.host;

  const prodWarningBox = `
<div id="toolButton">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <a href="#" id='prodWarningModal' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">
                    You are in Production!
                </a>
            </div>
        </div>
    </div>
</div>
`;
  const cpqSandboxModal = `
<div id="toolButton">
    <div class="container-fluid">
        <div class="row" id='toolButtonRow'>
            <div class="col-xs-12">
                <a href="#" id='sandboxModal' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">
                    You are in Sandbox!
                </a>
            </div>
            <div class="col-xs-12">
                <span>Domain: Test</span><br>
                <span>UserType: Test</span><br>
                <span>Company: Test</span><br>
            </div>
        </div>
    </div>
</div>
`;

  const sandboxModal = `
<div id="toolButton">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <a href="#" id='sandboxModal' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">
                    You are in Sandbox!
                </a>
            </div>
        </div>
    </div>
</div>
`;

  const newModalBox = `
<div id="devToolModal" class="modal fade" role="dialog" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content" >
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">IWS Development Tools</h4>
            </div>
            <div class="modal-body" style="max-height: 70vh;overflow-x: auto;">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span>IWS Developer Options</span>
                            </div>
                            <div class="panel-body">
                This is a body
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div> -->
        </div>
    </div>
</div>
`;

  const modalBox = `
<div id="devToolModal" class="modal fade invisible" role="dialog" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content" >
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">IWS Development Tools</h4>
            </div>
            <div class="modal-body" style="max-height: 70vh;overflow-x: auto;">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span>Script Workbench</span>
                            </div>
                            <div class="panel-body">
                                <iframe src="/ScriptWorkbench" frameBorder="0"
                                    class="embed-responsive-item includeFrame" style="height:465px;"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span>Developer Console</span>
                            </div>
                            <div class="panel-body">
                                <iframe src="/DeveloperConsole" frameBorder="0"
                                    class="embed-responsive-item includeFrame" style="height:390px;"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <span>Event Log</span>
                                </div>
                                <div class="panel-body">
                                    <iframe src="/Admin/Log/EventLog.aspx" frameBorder="0"
                                        class="embed-responsive-item includeFrame" style="height:1000px;"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div> -->
        </div>
    </div>
</div>`;

  if (host.includes("sandbox")) {
    $(".resp-setup").append(sandboxModal);
    $("#wrap").append(sandboxModal);
    $("body").append(sandboxModal);
    if (host.includes("webcomcpq")) {
      if (!window.location.href.includes("login")) {
        // $('.resp-setup').append(newModalBox)
        // $('#wrap').append(newModalBox)
        // $('body').append(newModalBox)
      }
    }
  } else {
    $(".resp-setup").append(prodWarningBox);
    $("#wrap").append(prodWarningBox);
    $("body").append(prodWarningBox);
  }

  // $('body').append(
  //   '<div class="modal fade" id="slide-bottom-popup" data-keyboard="false" data-backdrop="false">' +
  //         '    <div class="modal-body" id="prodWarningModal">' +
  //         '        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
  //         '        <p id="prodWarning">You are in Production!</p>' +
  //         '</div>'
  // )
  // $('#slide-bottom-popup').modal('show')
}

function loadJquery() {
  // $(document).ready(function () {
  //       // Failed attempt to add jquery/bootstrap
  //       $('head').append(
  //           '<script src="https://code.jquery.com/jquery-1.10.2.js"></script>'+
  //        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">'+
  //        '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>'
  //        // '<script src="https://code.jquery.com/jquery-1.9.1.slim.min.js"></script>'+
  //     )

  // })

  // javascript:(function() {
  //     function l(u, i) {
  //         var d = document;
  //         if (!d.getElementById(i)) {
  //             var s = d.createElement('script');
  //             s.src = u;
  //             s.id = i;
  //             d.body.appendChild(s);
  //         }
  //     }
  //     l('//code.jquery.com/jquery-3.5.1.min.js', 'jquery')
  // })();

  (function () {
    var jquery = document.createElement("SCRIPT");
    // jquery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    jquery.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(jquery);

    // setTimeout(element => {
    //     // onLoad()
    // },30)

    var bootstrapJS = document.createElement("SCRIPT");
    bootstrapJS.src =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
    bootstrapJS.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(bootstrapJS);

    var bootstrapCSS = document.createElement("LINK");
    bootstrapCSS.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    bootstrapCSS.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(bootstrapCSS);
  })();
}

function cpqTweaks() {
  $(document).on("keydown", function (e) {
    console.log(e);
    // console.log('You pressed: ' + e.key + ' - ' + e.keyCode)

    if (e.key === "Enter" && e.ctrlKey === true) {
      $("button.btn.btn-primary.btn-sm.pull-left").click();
      return false;
    }
    if (e.key === "F2") {
      $("button.btn.btn-primary.btn-sm.pull-left").click();
      return false;
    }
  });
}

function domainSave() {
  if (isCPQ) {
    domainKey = "cpqDomains";
  }
  if (isWorkflow) {
    domainKey = "workflowDomains";
  }

  function selectList() {
    /*
     ** Select List
     */
    const domainSelectList = document.createElement("li");
    domainSelectList.id = "domainPickLi";
    domainSelectList.className = "domain-name";
    domainSelectList.style = "margin: 0px";

    const domainSelect = document.createElement("select");
    domainSelect.id = "domainPickSlct";
    domainSelect.className = "login-input";
    domainSelect.name = "domainPickSlct";
    domainSelect.style = "width: 100% !important";
    domainSelect.autocomplete = "on";

    domainSelectList.appendChild(domainSelect);
    if (isCPQ) {
      const domainElement = document.getElementById(
        "ctl00_MainContentPlaceHolder_DomainName",
      );
      domainElement.insertAdjacentElement("afterend", domainSelectList);
    }
    if (isWorkflow) {
      const domainElement = document.getElementById("tenantInfo");
      domainElement.insertAdjacentElement("afterend", domainSelectList);
    }
  }
  function newDomain() {
    /*
     ** Domain
     */
    const newDomainElement = document.createElement("li");
    newDomainElement.id = "lblLst";
    newDomainElement.className = "domain-name";
    newDomainElement.style = "margin: 0px";

    const newDomainNameLabel = document.createElement("label");
    newDomainNameLabel.id = "newDomainNameLbl";
    newDomainNameLabel.className = "loginTableLabel";
    newDomainNameLabel.for = "newDomainNm";
    newDomainNameLabel.innerText = "New Domain";
    // newDomainNameLabel.style = 'float: left;'

    const newDomainNameInput = document.createElement("input");
    newDomainNameInput.id = "newDomainNm";
    newDomainNameInput.className = "login-input";
    newDomainNameInput.type = "text";
    newDomainNameInput.name = "format";
    newDomainNameInput.value = "";

    newDomainElement.appendChild(newDomainNameLabel);
    // if (isWorkflow) {
    //   newDomainElement.appendChild(document.createElement('br'))
    // }
    newDomainElement.appendChild(newDomainNameInput);
    const domainSelectList = document.getElementById("domainPickLi");
    domainSelectList.insertAdjacentElement("afterend", newDomainElement);
  }
  function newDescription() {
    /*
     ** Description
     */

    const descElement = document.createElement("li");
    descElement.id = "inputLst";
    descElement.className = "domain-name";
    descElement.style = "margin: 0px";

    const newDomainDescLabel = document.createElement("label");
    newDomainDescLabel.id = "newDomainDescLabel";
    newDomainDescLabel.className = "loginTableLabel";
    newDomainDescLabel.for = "newDomainDesc";
    newDomainDescLabel.innerText = "Description";
    // newDomainDescLabel.style = 'float: right;'

    const newDomainDescInput = document.createElement("input");
    newDomainDescInput.id = "newDomainDsc";
    newDomainDescInput.className = "login-input";
    newDomainDescInput.type = "text";
    newDomainDescInput.name = "format";
    newDomainDescInput.value = "";

    descElement.appendChild(newDomainDescLabel);
    // if (isWorkflow) {
    //   descElement.appendChild(document.createElement('br'))
    // }
    descElement.appendChild(newDomainDescInput);
    const newDomainElement = document.getElementById("lblLst");

    newDomainElement.insertAdjacentElement("afterend", descElement);
  }
  function actions() {
    /*
     ** Actions
     */

    const actionsList = document.createElement("li");
    actionsList.id = "actionsLi";
    actionsList.className = "domain-name";
    actionsList.style = "margin: 0px";

    const saveButton = document.createElement("button");
    saveButton.id = "saveBtn";
    saveButton.className = "btn btn-success";
    saveButton.type = "button";
    saveButton.innerText = "Save";
    saveButton.style = "background: green;";

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteBtn";
    deleteButton.className = "btn btn-danger";
    deleteButton.type = "button";
    deleteButton.innerText = "Delete";
    deleteButton.style = "float: right; background: darkred;";

    actionsList.appendChild(saveButton);
    actionsList.appendChild(deleteButton);
    const descElement = document.getElementById("inputLst");
    descElement.insertAdjacentElement("afterend", actionsList);

    $("#saveBtn").on("click", function () {
      save();
    });

    $("#deleteBtn").on("click", function () {
      deleteDomain();
    });

    $("#domainPickSlct").on("change", function () {
      const pickedDomain = document.getElementById("domainPickSlct").value;
      const index = pickedDomain.indexOf(" - ");
      const formattedDomain = pickedDomain.slice(0, index);
      const formattedDesc = pickedDomain.slice(index + 3);
      if (isCPQ) {
        document.getElementById(
          "ctl00_MainContentPlaceHolder_txtDomainName",
        ).value = formattedDomain;
      }
      if (isWorkflow) {
        document.getElementById("tenantNameField").value = formattedDomain;
      }

      document.getElementById("newDomainNm").value = formattedDomain;
      document.getElementById("newDomainDsc").value = formattedDesc;
    });
  }
  function getDefaults() {
    // This function runs every time you open the login page
    // It read the "settings" and put existing values on the page.
    document.getElementById("domainPickSlct").options.length = 0;

    var currentDomains = localStorage.getItem(domainKey);

    if (currentDomains) {
      currentDomains = currentDomains.split(",");
      if (currentDomains.length > 0) {
        var dropdown = document.getElementById("domainPickSlct");
        currentDomains.forEach((eachDomain) => {
          var option = document.createElement("option");
          option.text = eachDomain;
          dropdown.add(option);
        });

        var firstDomainKey = currentDomains[0];
        const index = firstDomainKey.indexOf(" - ");
        const formattedDomain = firstDomainKey.slice(0, index);
        const formattedDesc = firstDomainKey.slice(index + 3);
        if (isCPQ) {
          document.getElementById(
            "ctl00_MainContentPlaceHolder_txtDomainName",
          ).value = formattedDomain;
        }
        if (isWorkflow) {
          document.getElementById("tenantNameField").value = formattedDomain;
        }
        document.getElementById("newDomainNm").value = formattedDomain;
        document.getElementById("newDomainDsc").value = formattedDesc;
      }
    }
  }
  function save() {
    const savingName = document.getElementById("newDomainNm").value;
    if (savingName !== "") {
      const savingDesc = document.getElementById("newDomainDsc").value;
      const savingCombo = savingName + " - " + savingDesc;

      var availableDomains = [];
      availableDomains = localStorage.getItem(domainKey);

      var newDomains = [];
      if (availableDomains) {
        availableDomains = availableDomains.split(",");
        // If the object is not empty
        if (!availableDomains.includes(savingCombo)) {
          // If the site does not already exist in the list
          availableDomains.push(savingCombo);
          newDomains = availableDomains.sort();
          localStorage.setItem(domainKey, newDomains);
          getDefaults();
        }
      } else {
        // If the availableDomains object is empty
        // Set the setting to the current domain, in an array form.
        newDomains = [savingCombo];
        localStorage.setItem(domainKey, newDomains);
        getDefaults();
      }

      document.getElementById("domainPickSlct").value = savingCombo;

      if (isCPQ) {
        document.getElementById(
          "ctl00_MainContentPlaceHolder_txtDomainName",
        ).value = savingName;
      }
      if (isWorkflow) {
        document.getElementById("tenantNameField").value = savingName;
      }
    }
  }
  function deleteDomain() {
    var domainSelector = document.getElementById("domainPickSlct");
    var selectedDomain = domainSelector.selectedOptions[0].value;

    var availableDomains = [];
    availableDomains = localStorage.getItem(domainKey).split(",");

    const index = availableDomains.indexOf(selectedDomain);
    if (index > -1) {
      availableDomains.splice(index, 1);
      localStorage.setItem(domainKey, availableDomains);
    }
    getDefaults();
  }

  // Order is very important
  const isCPQLogin = document.getElementById(
    "ctl00_MainContentPlaceHolder_txtDomainName",
  );
  const isWorkflowLogin = document.getElementById("tenantNameField");
  if (isCPQLogin || isWorkflowLogin) {
    selectList();
    newDomain();
    newDescription();
    actions();
    getDefaults();
  }
}

function workflowTweaks() {
  $(".head.scriptsNavigationDiv").append(`
  <a id="IWSMenuButton" class="floatRight" href="#menu">
    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
  </a>
  <a href="#">
    <i id="HideHeaderButton" class="fa fa-desktop" aria-hidden="true"></i>
  </a>
  <a href="#">
    <i id="HelpButton" class="fa fa-question" aria-hidden="true"></i>
  </a>`);
  // $('#ajaxLoader, .ajaxLoader').appendTo(body)
  $("#script-ide-section-empty,#script-ide-section, #script-ide").height(
    $(window).height() - $(".header_top").height() - 100,
  );
  $(".floatRight").removeClass("floatRight");
  $("#script-ide-section-context").addClass("invisible");

  $(document).on("keydown", function (e) {
    if (e.which === 113) {
      $("#validateButtonSpan .apCancelAndDelete").click();
      return false;
    }
  });

  $(document).on(
    "click",
    "#script-ide > div.head.scriptsNavigationDiv > h2",
    function () {
      $("html,body").animate(
        {
          scrollTop: $("#script-ide-tabs-section").offset().top,
        },
        1000,
      );
    },
  );

  $(document).on("scroll", function () {
    $("#script-ide-section-empty,#script-ide-section, #script-ide").height(
      $(window).height() - $(".header_top").height() - 300,
    );
  });

  $(document).on("click", "#HelpButton", function () {
    $("#script-ide-section-context").toggleClass("invisible");
  });

  $(document).on("click", "#IWSMenuButton", function () {
    $("#script-ide-tree").toggleClass("invisible");
  });

  $(document).on("click", "#HideHeaderButton", function () {
    $("#header").toggleClass("invisible");
  });

  $(document).on("dblclick", ".fancytree-node", function () {
    $("#script-ide-tree").addClass("invisible");
    $("#header").addClass("invisible");
  });

  setInterval(function () {
    $("#script-ide-section-output .CodeMirror-wrap").height(
      $(window).height() - 270,
    );
  }, 3000);

  setInterval(function () {
    $("#script-ide-section-editor .CodeMirror-wrap").height(
      $(window).height() - 220,
    );
  }, 3000);
}

$(document).ready(function () {
  if (isCPQ) {
    const cpqScriptToolbar =
      document.getElementsByClassName("script-toolbar")[0];
    // If we're on the script workbench page
    if (cpqScriptToolbar) {
      addInternalOptions();
      viewSelector();
      themeSelector();
      cpqTweaks();
      codeFolding();
    }
    domainSave();
    prodWarning();
  }
  if (isWorkflow) {
    domainSave();
    workflowTweaks();
    // If we're on the script workbench page
    const workflowScriptIde = document.getElementById("script-ide-tabs");
    if (workflowScriptIde) {
      // addInternalOptions()
      themeSelector();
    }
    prodWarning();
  }
});
