
export function messageDialog(){
    const messageDialogContainer = document.querySelector('.message-dialog-container') as HTMLElement
    const buttonContainer = messageDialogContainer.querySelector('#button-container') as HTMLElement

    closeErrorDialog(messageDialogContainer, buttonContainer)
}

function closeErrorDialog(messageDialogContainer: HTMLElement, buttonContainer: HTMLElement){
    const errorButton = buttonContainer.querySelector('#error-ok-button') as HTMLElement
    errorButton.addEventListener('click', () => {
        messageDialogContainer.classList.remove('is-visible')
    })
}