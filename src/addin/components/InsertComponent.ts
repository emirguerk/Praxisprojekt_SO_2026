import { UseCaseInstance } from "../classes/UseCase";
import { UseCaseOption } from "../enums/UseCase";
import { cancleInsert, insertDialog } from "../functions/InsertDialog"
import { cancleUpdate, updateDialog } from "../functions/UpdateDialog";

class InsertComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `        
            <custom-loading type="insert"></custom-loading>
        `

        this.executeUseCase()
    }

    disconnectedCallback() {
        const currentUseCase : UseCaseOption = UseCaseInstance.getUseCase()

        if(currentUseCase === UseCaseOption.CREATE_CHART)
            cancleInsert()
        else
            cancleUpdate()
    }

    private executeUseCase(){
        const currentUseCase : UseCaseOption = UseCaseInstance.getUseCase()
        
        switch(currentUseCase){
            case UseCaseOption.CREATE_CHART:
                insertDialog()
                return

            case UseCaseOption.UPDATE_CHART:
                updateDialog()
                return

            default:
                throw new Error(`${currentUseCase} not initialized`)
        }
    }
}

customElements.define('custom-insert', InsertComponent)