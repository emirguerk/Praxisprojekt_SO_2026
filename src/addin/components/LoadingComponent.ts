import { LoadingType } from "../enums/LoadingType"
import { disconnectLoadingDialog, loadingDialog } from "../functions/LoafingDialog"

class LoadingComponent extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute('type') as LoadingType

        this.innerHTML = this.getHtml(type)
        loadingDialog()
    }

    disconnectedCallback() {
        disconnectLoadingDialog()
    }

    private getHtml(type: LoadingType) : string{
        switch(type){
            case LoadingType.LOAD:
                return `<div>Loading <span id="point-state">.</span></div>`
            case LoadingType.INSERT:
                return `<div>Inserting <span id="point-state">.</span></div>`
            default:
                return ``
        }
    }
}

customElements.define('custom-loading', LoadingComponent)