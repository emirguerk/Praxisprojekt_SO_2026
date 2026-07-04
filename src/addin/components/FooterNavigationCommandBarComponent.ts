import { footerNavigationDialog } from "../functions/FooterNavigationDialog"

class FooterNavigationCommandBarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <button id="back-button" class="button primary-button disabled">Back</button>
            <button id="next-button" class="button primary-button">Next</button>
            <button id="insert-button" class="button primary-button">Insert</button>
        `

        footerNavigationDialog()
    }
}

customElements.define('footer-navigation', FooterNavigationCommandBarComponent)