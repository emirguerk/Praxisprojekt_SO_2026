import { MessageDialog } from "../enums/MessageDialog"
import { messageDialog } from "../functions/MessageDialog"

class MessageDialogComponent extends HTMLElement {
    connectedCallback() {
        const messageDialogType = this.getAttribute('type') as string
        const html = this.getDialogAsHtml(messageDialogType)
        this.innerHTML = html

        messageDialog(messageDialogType)
    }

    private getDialogAsHtml(type: string){
        switch(type){
            case MessageDialog.ERROR:
                return this.getError()
            case MessageDialog.KEEP_PROPERTIES:
                return this.getKeeepProperties()
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

    private getKeeepProperties(){
        return `
            <div class="message-dialog-container">
                <div id="message-dialog">
                    <h1>Keep Properties</h1>
                    <p>Would you like to keep the existing formatting, such as alt text, descriptions, and sizes? If you confirm, all other properties will be lost.</p>
                    <div id="button-container">
                        <button id="no-button" class="button primary-button">No</button>
                        <button id="yes-button" class="button primary-button">Yes</button>
                    </div>
                </div>
            </div>
        `
    }
    
}

customElements.define('message-dialog', MessageDialogComponent)