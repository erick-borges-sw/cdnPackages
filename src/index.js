import header from './header.html'
import mainMenuDefault from './mainMenu.html'

class StratwsHeader extends HTMLElement {
    constructor(){
        super();
        const shadowDom = this.attachShadow({mode: "open"}); 

        shadowDom.appendChild(this.styles());

        shadowDom.appendChild(this.stratwsStylesLink());

        shadowDom.appendChild(this.createTemplate());
    }

    createTemplate() {
        const template = document.createElement('template');
        template.innerHTML = header;
        return template.content;
    }

    async connectedCallback() {
        // let mainMenuHtml = await this.getMainMenuHtml();

        // if(mainMenuHtml === undefined){
        //     mainMenuHtml = mainMenuDefault;
        // }

        let mainMenuHtml = mainMenuDefault;

        this.writeMainMenu(mainMenuHtml);
        this.activeMainMenuBehaviors();
    }

    stratwsStylesLink(){
        const link = document.createElement('link');
        // CHANGE TO PRODUCTION
        const linkHref = "http://vli.cacatua.com/SIMPLE/Content/sw-css/modules/main-navbar.css?version=2104.6";
        
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkHref);

        return link;
    }

    styles(){
        const style = document.createElement('style');
        style.textContent = `
            #mainMenuSpace {
                height: 100%;
            }
            .main-menu-wrap {
                display: inline-flex;
                justify-content: flex-start;
                position: relative;
                font-size: 12px;
            }
            .main-menu-wrap:not(.open) .main-menu {
                display: none;
            }
            .main-menu-wrap .main-menu {
                position: absolute;
                z-index: 10;
                top: 4px;
                width: 340px;
                background-color: #FFF;
                border: 1px solid rgba(0,0,0,0.2);
                box-shadow: 0 5px 10px rgba(0,0,0,0.2);
                border-radius: 6px;
                color: #333;
                overflow: hidden;
            }
            .main-menu-wrap .main-menu li a {
                cursor: pointer;
            }
            .main-menu-wrap .main-menu .mm-ctrl .mm-list li.mm-featured-item svg {
                width: 14px;
                height: 14px;
                margin: 3px 0;
                fill: #333;
            }
        `;

        return style;
    }

    async getMainMenuHtml() {
        return new Promise((resolve, reject) => resolve(
            fetch('/SIMPLE/Initiative/GetMainMenu')
                .then(res => res.status == 404 ? undefined : res.text())
                .then((data) => data)
                .catch((error) => error)
        ));
    }

    writeMainMenu(mainMenuHtml){
        const mainMenuSpace = this.shadowRoot.querySelector("#mainMenuSpace");
        mainMenuSpace.innerHTML = mainMenuHtml
    }

    activeMainMenuBehaviors(){
        const popover = this.shadowRoot.querySelector("#mainMenuWrap");
        const openButton = this.shadowRoot.querySelector("#mainMenuTrigger");

        this.openMenuOnClick(openButton, popover);
        
        this.closeMenuOnClickCloseIcon(popover);
        
        this.showListOnHoverIcon();

        this.closeMenuOnClickOutside(popover, openButton);

    }

    openMenuOnClick(openButton, popover) {
        openButton.addEventListener("click", () => popover.classList.add('open'));
    }

    closeMenuOnClickCloseIcon(popover) {
        const closeBtn = this.shadowRoot.querySelector("#mainMenuClose");
        closeBtn.addEventListener("click", () => popover.classList.remove('open'));
    }

    showListOnHoverIcon() {
        const switchItems = this.shadowRoot.querySelectorAll(".js-main-menu-switch");
        switchItems.forEach(item => {
            item.addEventListener("mouseenter", (event) => {
                const itemHoveredId = event.target.dataset.id;

                this.shadowRoot.querySelectorAll(`.js-sub-list-wrap`).forEach(body => body.classList.remove("mm-body-active"));
                this.shadowRoot.querySelectorAll(`.js-main-menu-switch`).forEach(anchor => anchor.closest('li').classList.remove("mm-ctrl-active"));
                
                this.shadowRoot.querySelector(`.js-sub-list-wrap[data-id="${itemHoveredId}"]`).classList.add("mm-body-active");
                this.shadowRoot.querySelector(`.js-main-menu-switch[data-id="${itemHoveredId}"]`).closest('li').classList.add("mm-ctrl-active");
            });
        });
    }

    closeMenuOnClickOutside(popover, openButton) {
        popover.addEventListener("click", (event) => event.stopPropagation());
        openButton.addEventListener("click", (event) => event.stopPropagation());
        window.addEventListener("click", () => {
            if (popover.classList.contains('open')) {
                popover.classList.remove('open');
            }
        });
    }
}

window.customElements.define('stratws-header', StratwsHeader);