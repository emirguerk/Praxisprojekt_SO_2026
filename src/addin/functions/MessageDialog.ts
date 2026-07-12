import { UseCaseInstance } from "../classes/UseCase"
import { WorkflowInstance } from "../classes/Workflow"
import { MessageDialog } from "../enums/MessageDialog"
import { UseCaseOption } from "../enums/UseCase"
import { WorkflowOption } from "../enums/WorkflowOption"
import { IMessageDialog } from "../types/IMessageDialog"

let dialogAnswerResolver: ((answer: boolean) => void)

export function messageDialog(dialogType: string) {
    if (dialogType === MessageDialog.KEEP_PROPERTIES) {
        if(UseCaseInstance.getUseCase() === UseCaseOption.UPDATE_CHART 
            && WorkflowInstance.getCurrentWorkflow() === WorkflowOption.INSERT_CHART)
                initKeepPropertiesDialog()
    } else {
        closeErrorDialog()
    }
}

export function getMessageDialogAnswer(): Promise<boolean> {
    return new Promise((resolve) => {
        dialogAnswerResolver = resolve
    });
}

function initKeepPropertiesDialog() {
    const { messageDialog, button } = getMessageDialogElements()

    const noButton = button.querySelector('#no-button') as HTMLElement
    const yesButton = button.querySelector('#yes-button') as HTMLElement

    noButton.addEventListener('click', () => {
        messageDialog.classList.remove('is-visible')
        dialogAnswerResolver?.(false)
    });

    yesButton.addEventListener('click', () => {
        messageDialog.classList.remove('is-visible')
        dialogAnswerResolver?.(true)
    });
}

function closeErrorDialog() {
    const { messageDialog, button } = getMessageDialogElements()

    const errorButton = button.querySelector('#error-ok-button') as HTMLElement

    errorButton.addEventListener('click', () => {
        messageDialog.classList.remove('is-visible')
    });
}

function getMessageDialogElements() {
    const messageDialog = document.querySelector('message-dialog') as IMessageDialog
    const button = messageDialog.querySelector('#button-container') as HTMLElement

    return {
        messageDialog,
        button
    }
}