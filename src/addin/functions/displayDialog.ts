import { IDialogMessage } from "../types/IDialogMessage";

export function dispalyDialog() {
    Office.context.ui.displayDialogAsync('https://localhost:3000/dialog.html', 
        { height: 75, width: 80, displayInIframe: true },
            (asyncResult) => {
                const dialog = asyncResult.value

                dialog.addEventHandler(Office.EventType.DialogMessageReceived,
                    (args) => {
                            const messageChild = args as IDialogMessage
                            const data = JSON.parse(messageChild.message)

                            console.log(data.success)

                            dialog.close()
                        }
                    )
            }
        )
}