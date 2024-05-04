(()=>{"use strict";const e=window.location.host,t=["cpq.cloud.sap"].some((t=>e.includes(t))),n=["workflow.cloud.sap"].some((t=>e.includes(t)));function o(){const e=window.location.host.includes("sandbox")?'\n  <div id="toolButton">\n      <div class="container-fluid">\n          <div class="row">\n              <div class="col-xs-12">\n                  <a href="#" id=\'sandboxModal\' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">\n                      You are in Sandbox!\n                  </a>\n              </div>\n          </div>\n      </div>\n  </div>\n  ':'\n  <div id="toolButton">\n      <div class="container-fluid">\n          <div class="row">\n              <div class="col-xs-12">\n                  <a href="#" id=\'prodWarningModal\' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">\n                      You are in Production!\n                  </a>\n              </div>\n          </div>\n      </div>\n  </div>\n  ',t=document.querySelector(".resp-setup"),n=document.getElementById("wrap"),o=document.body;t&&(t.innerHTML+=e),n&&(n.innerHTML+=e),o.innerHTML+=e}function l(){var e,t;const n=document.querySelector(".CodeMirror"),o=document.querySelectorAll(".CodeMirror")[1];let l=null!==(e=localStorage.getItem("selectedTheme"))&&void 0!==e?e:"default";function d(e){"default"===e&&(e="");const t="cm-s-".concat(l),d="cm-s-".concat(e);n&&(n.classList.remove(t),n.classList.add(d)),o&&(o.classList.remove(t),o.classList.add(d)),l=e,localStorage.setItem("selectedTheme",e)}const i=["default","3024-day","3024-night","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","bespin","base16-light","blackboard","cobalt","colorforth","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","isotope","lesser-dark","liquibyte","lucario","material","material-darker","material-palenight","material-ocean","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","idea","darcula","yonce","zenburn"];i.forEach((e=>{const t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href="https://codemirror.net/theme/".concat(e,".css"),document.body.appendChild(t)}));const c=document.createElement("div");c.className="form-group floatRight",c.style.marginRight="10px";const a=document.createElement("label");a.setAttribute("for","themePickSlct"),a.innerText="Select Theme:";const s=document.createElement("select");s.className="form-control floatRight",s.style.width="auto",s.id="themePickSlct",i.forEach((e=>{const t=document.createElement("option");t.text=e,t.value=e,s.appendChild(t)})),c.appendChild(a),c.appendChild(s),null===(t=document.getElementById("menuDiv"))||void 0===t||t.appendChild(c),s.addEventListener("change",(()=>{d(s.value)})),s.value=l,d(l)}function d(){const e=t?"cpqDomains":"workflowDomains";function o(e,t,n){const o=document.createElement("li");o.id=n,o.className="domain-name",o.style.margin="0px";const l=document.createElement("label");l.className="loginTableLabel",l.htmlFor=e,l.innerText=t;const d=document.createElement("input");return d.id=e,d.className="login-input",d.type="text",d.name="format",o.append(l,d),o}function l(e,t,n,o){const l=document.createElement("button");return l.id=t,l.className="btn ".concat(n),l.type="button",l.innerText=e,l.style.cssText=o,l}function d(){var t;const n=document.getElementById("domainPickSlct");n.options.length=0;((null===(t=localStorage.getItem(e))||void 0===t?void 0:t.split(","))||[]).forEach((e=>{const t=new Option(e,e);n.add(t)}))}function i(){if(document.getElementById("newDomainNm").value){var t;const n=new Set((null===(t=localStorage.getItem(e))||void 0===t?void 0:t.split(","))||[]),o=Array.from(n).sort(((e,t)=>e.localeCompare(t)));localStorage.setItem(e,o.join(",")),d()}}function c(){var t;const n=document.getElementById("domainPickSlct").value,o=new Set((null===(t=localStorage.getItem(e))||void 0===t?void 0:t.split(","))||[]);o.delete(n);const l=Array.from(o).sort(((e,t)=>e.localeCompare(t)));localStorage.setItem(e,l.join(",")),d()}document.getElementById(t?"ctl00_MainContentPlaceHolder_txtDomainName":"tenantNameField")&&(!function(){const e=document.createElement("li");e.id="domainPickLi",e.className="domain-name",e.style.margin="0px";const o=document.createElement("select");if(o.id="domainPickSlct",o.className="login-input",o.name="domainPickSlct",o.style.width="100%",o.autocomplete="on",e.appendChild(o),t){const t=document.getElementById("ctl00_MainContentPlaceHolder_DomainName");null===t||void 0===t||t.insertAdjacentElement("afterend",e)}if(n){const t=document.getElementById("tenantInfo");null===t||void 0===t||t.insertAdjacentElement("afterend",e)}}(),function(){const e=o("newDomainNm","New Domain","lblLst"),t=document.getElementById("domainPickLi");null===t||void 0===t||t.insertAdjacentElement("afterend",e)}(),function(){const e=o("newDomainDsc","Description","inputLst"),t=document.getElementById("lblLst");null===t||void 0===t||t.insertAdjacentElement("afterend",e)}(),function(){const e=document.createElement("li");e.id="actionsLi",e.className="domain-name",e.style.margin="0px";const t=l("Save","saveBtn","btn-success","background: green;"),n=l("Delete","deleteBtn","btn-danger","float: right; background: darkred;");e.appendChild(t),e.appendChild(n);const o=document.getElementById("inputLst");null===o||void 0===o||o.insertAdjacentElement("afterend",e),t.addEventListener("click",i),n.addEventListener("click",c)}(),d())}chrome.runtime.onMessage.addListener((e=>{console.log("[content.js]. Message received",e)})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.createElement("div");if(e.textContent="This is a new element added by my Chrome Extension!",e.style.cssText="position: fixed; top: 10px; left: 10px; background: orange; padding: 10px; z-index: 1000;",document.body.appendChild(e),t){document.querySelector(".script-toolbar")&&(function(){const e=document.createElement("a");e.setAttribute("type","button"),e.setAttribute("data-toggle","collapse"),e.setAttribute("data-target","#menuDiv"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","menuDiv"),e.href="#",e.setAttribute("role","button"),e.innerText="Iron Wood Solutions",e.style.cssText="font-weight: bold;",e.classList.add("btn","btn-primary","btn-sm"),e.id="optsButton";const t=document.querySelector(".col-sm-6.control-label.text-right");null===t||void 0===t||t.appendChild(e);const n=document.getElementById("mainadminmenu");if(n){const t=n.children[0],o=document.createElement("li");o.id="menuItem_iws",o.appendChild(e.cloneNode(!0)),t.appendChild(o),o.addEventListener("click",(()=>{const e=document.getElementById("wfOptionsToolbar");e&&(e.style.display="none"===e.style.display?"block":"none")}))}const o=document.createElement("div");o.className="collapse menuDiv col-1 btn-toolbar",o.id="menuDiv";const l=document.querySelector(".script-toolbar");if(null===l||void 0===l||l.insertAdjacentElement("beforebegin",o),n){const e=n.parentNode,t=null===e||void 0===e?void 0:e.parentNode,l=null===t||void 0===t?void 0:t.parentNode,d=document.createElement("td");d.style.cssText="height: 45px;";const i=document.createElement("tr");i.id="wfOptionsToolbar",i.style.cssText="height: 45px; display: none;",i.appendChild(d),d.appendChild(o),null===l||void 0===l||l.appendChild(i)}}(),function(){function e(){const e=document.getElementById("viewPickSlct").value,n=document.querySelector(".CodeMirror"),o=document.getElementById("tracesContainer"),l=document.querySelector(".col-sm-6.control-label.text-right"),d=document.querySelector(".tracetitle");null===n||void 0===n||n.classList.remove("col-sm-6","col-md-6","leftscript","col-sm-8","col-md-8","largeleft"),null===o||void 0===o||o.classList.remove("righttrace","col-sm-6","col-md-6","col-md-4","col-sm-4","smallright","col-md-12","col-sm-12"),"Default"===e?(null===o||void 0===o||o.classList.add("col-md-12","col-sm-12"),null===d||void 0===d||d.setAttribute("style","")):"Side By Side"===e?(null===n||void 0===n||n.classList.add("col-sm-6","col-md-6","leftscript"),null===o||void 0===o||o.classList.add("righttrace","col-sm-6","col-md-6"),null===d||void 0===d||d.setAttribute("style","display: none;")):"Narrow Trace"===e&&(null===n||void 0===n||n.classList.add("col-sm-8","col-md-8","largeleft"),null===o||void 0===o||o.classList.add("smallright","col-sm-4","col-md-4"),null===d||void 0===d||d.setAttribute("style","display: none;")),t(l),localStorage.setItem("selectedView",e)}function t(e){let t=document.getElementById("traceControl");t||(t=document.createElement("a"),t.className="btn btn-primary btn-sm traceControl",t.href="#",t.role="button",t.textContent="Clear Traces",t.id="traceControl",null===e||void 0===e||e.appendChild(t))}const n=document.getElementById("menuDiv");if(n){var o;const t=document.createElement("div");t.className="form-group",t.style.cssText="float: left; margin-right: 10px";const l=document.createElement("label");l.setAttribute("for","viewPickSlct"),l.textContent="Select View:";const d=document.createElement("select");d.className="form-control",d.id="viewPickSlct",["Default","Side By Side","Narrow Trace"].forEach((e=>{const t=document.createElement("option");t.textContent=e,t.value=e,d.appendChild(t)})),t.appendChild(l),t.appendChild(d),n.appendChild(t),d.addEventListener("change",e);const i=null!==(o=localStorage.getItem("selectedView"))&&void 0!==o?o:"Default";d.value=i,e()}}(),l(),document.addEventListener("keydown",(e=>{console.log(e);const{key:t,ctrlKey:n}=e;("Enter"===t&&n||"F2"===t)&&(document.querySelectorAll("button.btn.btn-primary.btn-sm.pull-left").forEach((e=>e.click())),e.preventDefault(),e.stopPropagation())})),function(){["https://codemirror.net/addon/fold/brace-fold.js","https://codemirror.net/addon/fold/comment-fold.js","https://codemirror.net/addon/fold/foldcode.js","https://codemirror.net/addon/fold/foldgutter.js","https://codemirror.net/addon/fold/indent-fold.js","https://codemirror.net/addon/fold/markdown-fold.js","https://codemirror.net/addon/fold/xml-fold.js"].forEach((e=>{const t=document.createElement("script");t.src=e,document.body.appendChild(t)}));const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.href="https://codemirror.net/addon/fold/foldgutter.css",document.head.appendChild(e)}()),d(),o()}if(n){d(),function(){const e=document.querySelector(".head.scriptsNavigationDiv");e&&(e.innerHTML+='\n      <a id="IWSMenuButton" class="floatRight" href="#menu">\n        <i class="fa fa-folder-open-o" aria-hidden="true"></i>\n      </a>\n      <a href="#">\n        <i id="HideHeaderButton" class="fa fa-desktop" aria-hidden="true"></i>\n      </a>\n      <a href="#">\n        <i id="HelpButton" class="fa fa-question" aria-hidden="true"></i>\n      </a>');function t(e){const t=document.querySelectorAll("#script-ide-section-empty, #script-ide-section, #script-ide"),n=document.querySelector(".header_top"),o=n?n.offsetHeight:0;t.forEach((t=>{t&&(t.style.height="".concat(window.innerHeight-o-e,"px"))}))}t(100),document.querySelectorAll(".floatRight").forEach((e=>e.classList.remove("floatRight")));const n=document.querySelector("#script-ide-section-context");null===n||void 0===n||n.classList.add("invisible"),document.addEventListener("keydown",(e=>{if("F2"===e.key){const t=document.querySelector("#validateButtonSpan .apCancelAndDelete");t&&t.click(),e.preventDefault()}})),document.addEventListener("click",(e=>{const t=e.target;if(t)if(t.closest("#script-ide > div.head.scriptsNavigationDiv > h2")){const e=document.querySelector("#script-ide-tabs-section");e&&window.scrollTo({top:e.offsetTop,behavior:"smooth"})}else if("HelpButton"===t.id){var n;null===(n=document.querySelector("#script-ide-section-context"))||void 0===n||n.classList.toggle("invisible")}else if("IWSMenuButton"===t.id){var o;null===(o=document.querySelector("#script-ide-tree"))||void 0===o||o.classList.toggle("invisible")}else if("HideHeaderButton"===t.id){var l;null===(l=document.querySelector("#header"))||void 0===l||l.classList.toggle("invisible")}else if(t.matches(".fancytree-node")){var d,i;null===(d=document.querySelector("#script-ide-tree"))||void 0===d||d.classList.add("invisible"),null===(i=document.querySelector("#header"))||void 0===i||i.classList.add("invisible")}})),document.addEventListener("scroll",(()=>{t(300)})),setInterval((()=>t(270)),3e3),setInterval((()=>t(220)),3e3)}();document.getElementById("script-ide-tabs")&&l(),o()}}))})();
//# sourceMappingURL=content.js.map