import { PopUpOption } from "../enums/PopUpOption";
import { UseCaseOption } from "../enums/UseCase";
import { IDialogMessage } from "../types/IDialogMessage";
import { showPopUpDialog } from "./PopUpDialog";

export function dispalyDialog(useCase: UseCaseOption) {
    const apiUrl = process.env.API_URL

    Office.context.ui.displayDialogAsync(`${apiUrl}/dialog.html`, 
        { height: 75, width: 80, displayInIframe: true },
            (asyncResult) => {
                const dialog = asyncResult.value

                dialog.addEventHandler(Office.EventType.DialogMessageReceived,
                    (args) => {
                            const messageChild = args as IDialogMessage
                            const data = JSON.parse(messageChild.message)

                            if(data.initUseCase){
                                dialog.messageChild(JSON.stringify({ initUseCase: useCase }))
                                return
                            }

                            dialog.close()

                            if(data.success){
                                showPopUpDialog(PopUpOption.SUCCESS)
                            } else {
                                showPopUpDialog(PopUpOption.ERROR)
                            }
                        }
                    )
            }
        )
}