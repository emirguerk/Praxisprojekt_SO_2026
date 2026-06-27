class FooterNavigationCommandBarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <button class="button primary-button">Back</button>
            <button class="button primary-button">Next</button>
        `
    }
}

customElements.define('footer-navigation', FooterNavigationCommandBarComponent)