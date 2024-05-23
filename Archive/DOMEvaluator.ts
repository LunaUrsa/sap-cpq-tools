function prodWarning(): void {
  const host = window.location.host;

  const modal = host.includes("sandbox")
    ? `
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
  `
    : `
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

  const respSetup = document.querySelector(".resp-setup");
  const wrap = document.getElementById("wrap");
  const body = document.body;
  if (respSetup) respSetup.innerHTML += modal;
  if (wrap) wrap.innerHTML += modal;
  body.innerHTML += modal;
}

function codeFolding(): void {
  // List of script URLs to load
  const scriptUrls = [
    "https://codemirror.net/addon/fold/brace-fold.js",
    "https://codemirror.net/addon/fold/comment-fold.js",
    "https://codemirror.net/addon/fold/foldcode.js",
    "https://codemirror.net/addon/fold/foldgutter.js",
    "https://codemirror.net/addon/fold/indent-fold.js",
    "https://codemirror.net/addon/fold/markdown-fold.js",
    "https://codemirror.net/addon/fold/xml-fold.js",
  ];

  // Append each script to the body
  scriptUrls.forEach((url) => {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  });

  // Append CSS to the head
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://codemirror.net/addon/fold/foldgutter.css";
  document.head.appendChild(link);
}

function themeSelector(): void {
  const codeMirror = document.querySelector<HTMLDivElement>(".CodeMirror");
  const traceMirror =
    document.querySelectorAll<HTMLDivElement>(".CodeMirror")[1];
  // const themePickSlct = document.getElementById(
  //   "themePickSlct",
  // ) as HTMLSelectElement;
  let previousTheme: string =
    localStorage.getItem("selectedTheme") ?? "default";

  function changeTheme(newTheme: string): void {
    if (newTheme === "default") {
      newTheme = ""; // Assume default theme has no prefix
    }

    const previousThemeClass = `cm-s-${previousTheme}`;
    const newThemeClass = `cm-s-${newTheme}`;

    if (codeMirror) {
      codeMirror.classList.remove(previousThemeClass);
      codeMirror.classList.add(newThemeClass);
    }
    if (traceMirror) {
      traceMirror.classList.remove(previousThemeClass);
      traceMirror.classList.add(newThemeClass);
    }

    previousTheme = newTheme; // Update the previousTheme
    localStorage.setItem("selectedTheme", newTheme);
  }

  const themeList: string[] = [
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

  themeList.forEach((theme) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `https://codemirror.net/theme/${theme}.css`;
    document.body.appendChild(link);
  });

  const themePickDiv = document.createElement("div");
  themePickDiv.className = "form-group floatRight";
  themePickDiv.style.marginRight = "10px";

  const themePickLabel = document.createElement("label");
  themePickLabel.setAttribute("for", "themePickSlct");
  themePickLabel.innerText = "Select Theme:";

  const themePickSelect = document.createElement("select");
  themePickSelect.className = "form-control floatRight";
  themePickSelect.style.width = "auto";
  themePickSelect.id = "themePickSlct";

  themeList.forEach((theme) => {
    const option = document.createElement("option");
    option.text = theme;
    option.value = theme;
    themePickSelect.appendChild(option);
  });

  themePickDiv.appendChild(themePickLabel);
  themePickDiv.appendChild(themePickSelect);
  document.getElementById("menuDiv")?.appendChild(themePickDiv);

  themePickSelect.addEventListener("change", () => {
    changeTheme(themePickSelect.value);
  });

  // Set the initial theme based on stored value or default
  themePickSelect.value = previousTheme;
  changeTheme(previousTheme);
}

function viewSelector(): void {
  function changeView(): void {
    const viewSlct = document.getElementById(
      "viewPickSlct",
    ) as HTMLSelectElement;
    const selectedView = viewSlct.value; // Simplified access to selected value
    const codeWindow = document.querySelector<HTMLDivElement>(".CodeMirror");
    const traceWindow = document.getElementById("tracesContainer");
    const buttonBar = document.querySelector(
      ".col-sm-6.control-label.text-right",
    );
    const traceTitle = document.querySelector(".tracetitle");

    // Clear all classes
    codeWindow?.classList.remove(
      "col-sm-6",
      "col-md-6",
      "leftscript",
      "col-sm-8",
      "col-md-8",
      "largeleft",
    );
    traceWindow?.classList.remove(
      "righttrace",
      "col-sm-6",
      "col-md-6",
      "col-md-4",
      "col-sm-4",
      "smallright",
      "col-md-12",
      "col-sm-12",
    );

    if (selectedView === "Default") {
      traceWindow?.classList.add("col-md-12", "col-sm-12");
      traceTitle?.setAttribute("style", "");
    } else if (selectedView === "Side By Side") {
      codeWindow?.classList.add("col-sm-6", "col-md-6", "leftscript");
      traceWindow?.classList.add("righttrace", "col-sm-6", "col-md-6");
      traceTitle?.setAttribute("style", "display: none;");
    } else if (selectedView === "Narrow Trace") {
      codeWindow?.classList.add("col-sm-8", "col-md-8", "largeleft");
      traceWindow?.classList.add("smallright", "col-sm-4", "col-md-4");
      traceTitle?.setAttribute("style", "display: none;");
    }

    // Manage the clear traces button
    manageClearTracesButton(buttonBar);

    localStorage.setItem("selectedView", selectedView);
  }

  function manageClearTracesButton(parentElement: Element | null): void {
    let clearTrace = document.getElementById(
      "traceControl",
    ) as HTMLAnchorElement;
    if (!clearTrace) {
      clearTrace = document.createElement("a");
      clearTrace.className = "btn btn-primary btn-sm traceControl";
      clearTrace.href = "#";
      clearTrace.role = "button";
      clearTrace.textContent = "Clear Traces";
      clearTrace.id = "traceControl";
      parentElement?.appendChild(clearTrace);
    }
  }

  // Creating view selection UI
  const optionsToolbar = document.getElementById("menuDiv");
  if (optionsToolbar) {
    const viewPick = document.createElement("div");
    viewPick.className = "form-group";
    viewPick.style.cssText = "float: left; margin-right: 10px";

    const viewPickLabel = document.createElement("label");
    viewPickLabel.setAttribute("for", "viewPickSlct");
    viewPickLabel.textContent = "Select View:";

    const viewPickSelect = document.createElement("select");
    viewPickSelect.className = "form-control";
    viewPickSelect.id = "viewPickSlct";
    ["Default", "Side By Side", "Narrow Trace"].forEach((view) => {
      const option = document.createElement("option");
      option.textContent = view;
      option.value = view;
      viewPickSelect.appendChild(option);
    });

    viewPick.appendChild(viewPickLabel);
    viewPick.appendChild(viewPickSelect);
    optionsToolbar.appendChild(viewPick);

    viewPickSelect.addEventListener("change", changeView);

    // Set the initial view from local storage or default
    const currentView = localStorage.getItem("selectedView") ?? "Default";
    viewPickSelect.value = currentView;
    changeView();
  }
}

function addInternalOptions(): void {
  // Create a button the user can click to change options on the page
  const optionsButton = document.createElement("a");
  optionsButton.setAttribute("type", "button");
  optionsButton.setAttribute("data-toggle", "collapse");
  optionsButton.setAttribute("data-target", "#menuDiv");
  optionsButton.setAttribute("aria-expanded", "false");
  optionsButton.setAttribute("aria-controls", "menuDiv");
  optionsButton.href = "#";
  optionsButton.setAttribute("role", "button");
  optionsButton.innerText = "Iron Wood Solutions";
  optionsButton.style.cssText = "font-weight: bold;";
  optionsButton.classList.add("btn", "btn-primary", "btn-sm");
  optionsButton.id = "optsButton";

  const cpqButtonBar = document.querySelector(
    ".col-sm-6.control-label.text-right",
  );
  cpqButtonBar?.appendChild(optionsButton);

  const workflowNavBar = document.getElementById("mainadminmenu");
  if (workflowNavBar) {
    const navBarList = workflowNavBar.children[0];
    const optionsLi = document.createElement("li");
    optionsLi.id = "menuItem_iws";
    optionsLi.appendChild(optionsButton.cloneNode(true)); // Clone the button for use in another place
    navBarList.appendChild(optionsLi);

    // Event listener for toggle display logic
    optionsLi.addEventListener("click", () => {
      const x = document.getElementById("wfOptionsToolbar");
      if (x) {
        x.style.display = x.style.display === "none" ? "block" : "none";
      }
    });
  }

  // Create internal options menu
  const optionsToolbar = document.createElement("div");
  optionsToolbar.className = "collapse menuDiv col-1 btn-toolbar";
  optionsToolbar.id = "menuDiv";

  const cpqScriptToolbar = document.querySelector(".script-toolbar");
  cpqScriptToolbar?.insertAdjacentElement("beforebegin", optionsToolbar);

  if (workflowNavBar) {
    const wfTd = workflowNavBar.parentNode as HTMLTableCellElement;
    const wfTr = wfTd?.parentNode as HTMLTableRowElement;
    const wfTbody = wfTr?.parentNode as HTMLTableSectionElement;

    const wfNewTd = document.createElement("td");
    wfNewTd.style.cssText = "height: 45px;";

    const wfNewTr = document.createElement("tr");
    wfNewTr.id = "wfOptionsToolbar";
    wfNewTr.style.cssText = "height: 45px; display: none;";

    wfNewTr.appendChild(wfNewTd);
    wfNewTd.appendChild(optionsToolbar);
    wfTbody?.appendChild(wfNewTr);
  }
}

function domainSave(): void {
  const domainKey = isCPQ ? "cpqDomains" : "workflowDomains";
  function createSelectList(): void {
    const domainSelectList = document.createElement("li");
    domainSelectList.id = "domainPickLi";
    domainSelectList.className = "domain-name";
    domainSelectList.style.margin = "0px";

    const domainSelect = document.createElement("select");
    domainSelect.id = "domainPickSlct";
    domainSelect.className = "login-input";
    domainSelect.name = "domainPickSlct";
    domainSelect.style.width = "100%";
    domainSelect.autocomplete = "on";

    domainSelectList.appendChild(domainSelect);
    if (isCPQ) {
      const domainElement = document.getElementById(
        "ctl00_MainContentPlaceHolder_DomainName",
      );
      domainElement?.insertAdjacentElement("afterend", domainSelectList);
    }
    if (isWorkflow) {
      const domainElement = document.getElementById("tenantInfo");
      domainElement?.insertAdjacentElement("afterend", domainSelectList);
    }
  }

  function createDomainInput(): void {
    const newDomainElement = createInputListItem(
      "newDomainNm",
      "New Domain",
      "lblLst",
    );
    const domainSelectList = document.getElementById("domainPickLi");
    domainSelectList?.insertAdjacentElement("afterend", newDomainElement);
  }

  function createDescriptionInput(): void {
    const descElement = createInputListItem(
      "newDomainDsc",
      "Description",
      "inputLst",
    );
    const newDomainElement = document.getElementById("lblLst");
    newDomainElement?.insertAdjacentElement("afterend", descElement);
  }

  function createInputListItem(
    inputId: string,
    labelText: string,
    listId: string,
  ): HTMLLIElement {
    const liElement = document.createElement("li");
    liElement.id = listId;
    liElement.className = "domain-name";
    liElement.style.margin = "0px";

    const label = document.createElement("label");
    label.className = "loginTableLabel";
    label.htmlFor = inputId;
    label.innerText = labelText;

    const input = document.createElement("input");
    input.id = inputId;
    input.className = "login-input";
    input.type = "text";
    input.name = "format";

    liElement.append(label, input);
    return liElement;
  }

  function setupActions(): void {
    const actionsList = document.createElement("li");
    actionsList.id = "actionsLi";
    actionsList.className = "domain-name";
    actionsList.style.margin = "0px";

    const saveButton = createButton(
      "Save",
      "saveBtn",
      "btn-success",
      "background: green;",
    );
    const deleteButton = createButton(
      "Delete",
      "deleteBtn",
      "btn-danger",
      "float: right; background: darkred;",
    );

    actionsList.appendChild(saveButton);
    actionsList.appendChild(deleteButton);
    const descElement = document.getElementById("inputLst");
    descElement?.insertAdjacentElement("afterend", actionsList);

    saveButton.addEventListener("click", save);
    deleteButton.addEventListener("click", deleteDomain);
  }

  function createButton(
    text: string,
    id: string,
    className: string,
    style: string,
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = id;
    button.className = `btn ${className}`;
    button.type = "button";
    button.innerText = text;
    button.style.cssText = style;
    return button;
  }

  function getDefaults(): void {
    // Load and display existing domains from localStorage
    const domainSelect = document.getElementById(
      "domainPickSlct",
    ) as HTMLSelectElement;
    domainSelect.options.length = 0;
    const domains = localStorage.getItem(domainKey)?.split(",") || [];
    domains.forEach((domain) => {
      const option = new Option(domain, domain);
      domainSelect.add(option);
    });
  }

  function save(): void {
    const newName = (document.getElementById("newDomainNm") as HTMLInputElement)
      .value;
    if (newName) {
      const domains = new Set(
        localStorage.getItem(domainKey)?.split(",") || [],
      );
      const sortedDomains = Array.from(domains).sort((a, b) =>
        a.localeCompare(b),
      );
      localStorage.setItem(domainKey, sortedDomains.join(","));
      getDefaults();
    }
  }

  function deleteDomain(): void {
    const domainSelect = document.getElementById(
      "domainPickSlct",
    ) as HTMLSelectElement;
    const selected = domainSelect.value;
    const domains = new Set(localStorage.getItem(domainKey)?.split(",") || []);
    domains.delete(selected);
    const sortedDomains = Array.from(domains).sort((a, b) =>
      a.localeCompare(b),
    );
    localStorage.setItem(domainKey, sortedDomains.join(","));
    getDefaults();
  }

  // Initialize elements based on current login context
  if (
    document.getElementById(
      isCPQ ? "ctl00_MainContentPlaceHolder_txtDomainName" : "tenantNameField",
    )
  ) {
    createSelectList();
    createDomainInput();
    createDescriptionInput();
    setupActions();
    getDefaults();
  }
}