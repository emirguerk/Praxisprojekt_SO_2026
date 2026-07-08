import { insertDialog } from "../functions/InsertDialog"

class InsertComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `        
            <custom-loading type="insert"></custom-loading>
        `

        insertDialog()
    }
}

customElements.define('custom-insert', InsertComponent)