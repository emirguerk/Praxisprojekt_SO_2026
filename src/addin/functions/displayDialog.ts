import { UseCase } from "../enums/UseCase";
import { IDialogMessage } from "../types/IDialogMessage";

export function dispalyDialog(useCase: UseCase) {
    Office.context.ui.displayDialogAsync('https://localhost:3000/dialog.html', 
        { height: 75, width: 80, displayInIframe: true },
            (asyncResult) => {
                const dialog = asyncResult.value

                dialog.addEventHandler(Office.EventType.DialogMessageReceived,
                    (args) => {
                            const messageChild = args as IDialogMessage
                            const data = JSON.parse(messageChild.message)

                            if(data.fetchUseCase){
                                dialog.messageChild(JSON.stringify({ useCase: useCase }))
                                return
                            }

                            console.log(data.success)

                            dialog.close()
                        }
                    )
            }
        )
}