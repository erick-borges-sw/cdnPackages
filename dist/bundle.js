(()=>{"use strict";class e extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.appendChild(this.styles()),e.appendChild(this.stratwsStylesLink()),e.appendChild(this.fontAwesomeCDN()),e.appendChild(this.createTemplate())}createTemplate(){const e=document.createElement("template");return e.innerHTML=' <header class="navbar navbar-default navbar-fixed-top" style="background-color:#3777bc;z-index:9999;position:fixed;top:0;left:0;right:0"> <div class="main-navbar"> <div class="mn-left"> <div id="mainMenuSpace"></div> <slot name="secondMenu" class="second-menu"> </slot> </div> <div class="mn-center"> <img class="mn-logo" src="https://cdn.jsdelivr.net/gh/sankassio99/cdnPackages@v1.2.7/stratws-logo.svg" type="image/svg+xml"> </div> <div class="mn-right" id="controlButtons"> <slot name="workfrontFilter"></slot> <slot name="advancedFilter"></slot> <slot name="userNotifications"></slot> <slot name="profileAccount"></slot> </div> </div> </header>',e.content}async connectedCallback(){let e=await this.getMainMenuHtml();void 0===e&&(e='<div class="main-menu-wrap mini-popover"> <a class="mm-trigger" id="main-menu-trigger" data-mini-popover="true" data-mini-popover-conteudo="mini-popover-main-menu"> <svg> </svg> <span class="versao">2104.6</span> </a> <div id="mini-popover-main-menu" class="mp-box"> <div class="mp-content"> <div class="main-menu"> <div class="mm-ctrl"> <ul class="mm-list"> <li class="mm-featured-item"> <a id="js-main-menu-close" class="cursor-pointer"> <i class="fa fa-times"></i> </a> </li> <li> <a id="main-menu-painel" href="/SIMPLE/MeuPainel" class="js-main-menu-switch" data-id="mm-sub-painel"> <svg> </svg> </a> </li> <li> <a id="main-menu-performance" href="/SIMPLE/PerformanceCorporativa" class="js-main-menu-switch" data-id="mm-sub-results"> <svg> </svg> </a> </li> <li class="mm-ctrl-active"> <a id="main-menu-melhorias" href="/SIMPLE/OportunidadesDeMelhoria" class="js-main-menu-switch" data-id="mm-sub-actions"> <svg> </svg> </a> </li> <li> <a id="main-menu-admin" href="/SIMPLE/Configuracoes" class="js-main-menu-switch" data-id="mm-sub-admin"> <svg> </svg> </a> </li> </ul> </div> <div class="mm-body js-listagem-menus"> <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-painel"> <div class="mm-title">Meu Painel</div> <ul class="mm-sub-list"> <li><a id="main-menu-painel-agenda" href="/SIMPLE/MeuPainel#agenda"><span>Agenda</span></a> </li> <li><a id="main-menu-painel-radar" href="/SIMPLE/MeuPainel#radar"><span>Radar</span></a> </li> </ul> </div> <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-results"> <div class="mm-title">Performance Corporativa</div> <ul class="mm-sub-list"> <li><a id="main-menu-performance-planilha" href="/SIMPLE/PerformanceCorporativa/PlanilhaDeIndicadores"><span>Planilha</span></a> </li> </ul> </div> <div class="js-sub-list-wrap mm-sub-list-wrap mm-body-active" data-id="mm-sub-actions"> <div class="mm-title">Oportunidades de Melhoria</div> <ul class="mm-sub-list"> <li><a id="main-menu-melhorias-iniciativas" href="/SIMPLE/Initiatives"><span>Iniciativas</span></a></li> </ul> </div> <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-admin"> <div class="mm-title">Configurações</div> <ul class="mm-sub-list"> <li><a id="main-menu-admin-configuracoes" href="/SIMPLE/Configuracoes"><span>Configurações</span></a></li> </ul> </div> </div> </div> </div> </div></div>'),this.writeMainMenu(e),this.activeMainMenuBehaviors()}stratwsStylesLink(){const e=document.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href","http://vli.cacatua.com/SIMPLE/Content/sw-css/modules/main-navbar.css?version=2104.6"),e}fontAwesomeCDN(){const e=document.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href","https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"),e.setAttribute("type","text/css"),e}styles(){const e=document.createElement("style");return e.textContent="\n            \n        ",e}async getMainMenuHtml(){return new Promise(((e,s)=>e(fetch("/SIMPLE/Initiative/GetMainMenu").then((e=>404==e.status?void 0:e.text())).then((e=>e)).catch((e=>e)))))}writeMainMenu(e){this.shadowRoot.querySelector("#mainMenuSpace").innerHTML=e}activeMainMenuBehaviors(){const e=this.shadowRoot.querySelector("#mini-popover-main-menu"),s=this.shadowRoot.querySelector("#main-menu-trigger");this.openMenuOnClick(s,e),this.closeMenuOnClickCloseIcon(e),this.showListOnHoverIcon(),this.closeMenuOnClickOutside(e,s)}openMenuOnClick(e,s){e.addEventListener("click",(()=>s.style.display="block"))}closeMenuOnClickCloseIcon(e){this.shadowRoot.querySelector("#js-main-menu-close").addEventListener("click",(()=>e.style.display="none"))}showListOnHoverIcon(){this.shadowRoot.querySelectorAll(".js-main-menu-switch").forEach((e=>{e.addEventListener("mouseenter",(e=>{const s=e.target.dataset.id;this.shadowRoot.querySelectorAll(".js-sub-list-wrap").forEach((e=>e.classList.remove("mm-body-active"))),this.shadowRoot.querySelector(`.js-sub-list-wrap[data-id="${s}"]`).classList.add("mm-body-active")}))}))}closeMenuOnClickOutside(e,s){e.addEventListener("click",(e=>e.stopPropagation())),s.addEventListener("click",(e=>e.stopPropagation())),window.addEventListener("click",(()=>{"block"==e.style.display&&(e.style.display="none")}))}}window.customElements.define("stratws-header",e)})();