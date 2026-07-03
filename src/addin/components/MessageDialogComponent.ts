import { MessageDialogType } from "../enums/MessageDialogType"
import { messageDialog } from "../functions/MessageDialog"

class MessageDialogComponent extends HTMLElement {
    connectedCallback() {
        const messageDialogType = this.getAttribute('type') as string
        const html = this.getDialogAsHtml(messageDialogType)
        this.innerHTML = html

        messageDialog()
    }

    private getDialogAsHtml(type: string){
        switch(type){
            case MessageDialogType.ERROR:
                return this.getError()
            default:
                throw Error(`Unable to get Message Dialog from type: ${type}`)
        }
    }

    private getError(){
        return `
            <div class="message-dialog-container">
                <div id="message-dialog">
                    <h1>Error</h1>
                    <p>Only whole numbers are allowed. Please avoid letters and special characters.</p>
                    <div id="button-container">
                        <button id="error-ok-button" class="button primary-button">Ok</button>
                    </div>
                </div>
            </div>
        `
    }
    
}

customElements.define('message-dialog', MessageDialogComponent)