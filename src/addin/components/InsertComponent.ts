import { UseCase } from "../enums/UseCase";
import { insertDialog } from "../functions/InsertDialog"

class InsertComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `        
            <custom-loading type="insert"></custom-loading>
        `

        this.executeCurrentUseCase()
        this.fetchUseCase()
    }

    private fetchUseCase(){
        Office.context.ui.messageParent(JSON.stringify({ fetchUseCase: true }))
    }

    private executeCurrentUseCase() {
        Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived,
            (args) => {
                const message = JSON.parse(args.message);
                const useCase = message.useCase as UseCase

                if(useCase === UseCase.CREATE_CHART){
                    insertDialog()
                } else if (useCase === UseCase.UPDATE_CHART) {

                } else {

                }
            }
        )
    }
}

customElements.define('custom-insert', InsertComponent)