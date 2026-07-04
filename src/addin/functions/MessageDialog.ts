import { IMessageDialog } from "../types/IMessageDialog"

export function messageDialog(){
    closeErrorDialog()
}

function closeErrorDialog(){
    const { messageDialog , button } = getMessageDialogElements()

    const errorButton = button.querySelector('#error-ok-button') as HTMLElement
    errorButton.addEventListener('click', () => {
        messageDialog.classList.remove('is-visible')
    })
}

function getMessageDialogElements(){
    const messageDialog = document.querySelector('message-dialog') as IMessageDialog
    const button = messageDialog.querySelector('#button-container') as HTMLElement

    return {
        messageDialog,
        button
    }
}