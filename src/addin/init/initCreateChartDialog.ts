import { PopUpOption } from "../enums/PopUpOption"
import { UseCaseOption } from "../enums/UseCase"
import { hasEmptyContentControls } from "../functions/ContentControls"
import { dispalyDialog } from "../functions/DisplayDialog"
import { showPopUpDialog } from "../functions/PopUpDialog"

export function initCreateChartDialog(){
    const newChartDialogButton = document.querySelector('#new-chart-dialog-button')
    
    newChartDialogButton?.addEventListener('click', async () => { 
        if(await hasEmptyContentControls()){
            showPopUpDialog(PopUpOption.WARNING)
            return
        }
                
        dispalyDialog(UseCaseOption.CREATE_CHART) 
    })
}