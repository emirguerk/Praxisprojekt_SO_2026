import { createTableHtml, tableDialog } from "../functions/TabelDialog"

class TableComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = createTableHtml()
        tableDialog()
    }
}

customElements.define('custom-table', TableComponent)