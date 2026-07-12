import { PopUpOption } from "../enums/PopUpOption"
import { UseCaseOption } from "../enums/UseCase"
import { hasEmptyContentControls } from "../functions/ContentControls"
import { dispalyDialog } from "../functions/DisplayDialog"
import { showPopUpDialog } from "../functions/PopUpDialog"

export function initUpdateChartDialog(){
    const newChartDialogButton = document.querySelector('#update-chart-dialog-button')
    newChartDialogButton?.addEventListener('click', async () => {
        if(await hasEmptyContentControls()){
            showPopUpDialog(PopUpOption.WARNING)
            return
        }

        dispalyDialog(UseCaseOption.UPDATE_CHART) 
    })
}