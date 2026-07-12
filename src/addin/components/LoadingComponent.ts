import { LoadingOption } from "../enums/LoadingOption"
import { disconnectLoadingDialog, loadingDialog } from "../functions/LoadingDialog"

class LoadingComponent extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute('type') as LoadingOption

        this.innerHTML = this.getHtml(type)
        loadingDialog()
    }

    disconnectedCallback() {
        disconnectLoadingDialog()
    }

    private getHtml(type: LoadingOption) : string{
        switch(type){
            case LoadingOption.LOAD:
                return `<div>Loading <span id="point-state">.</span></div>`
            case LoadingOption.INSERT:
                return `
                    <div>Inserting <span id="point-state">.</span></div>
                    <button id="cancle-insert" class="button primary-button" type="button">Cancle</button>
                `
            default:
                return ``
        }
    }
}

customElements.define('custom-loading', LoadingComponent)