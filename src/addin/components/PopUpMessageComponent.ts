class popUpMessageComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <p>...</p>
        `
    }
}

customElements.define('custom-pop-up', popUpMessageComponent)