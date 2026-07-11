import { UseCaseOption } from "../enums/UseCase"
import { dispalyDialog } from "../functions/DisplayDialog"

export function initCreateChartDialog(){
    const newChartDialogButton = document.querySelector('#new-chart-dialog-button')
    
    newChartDialogButton?.addEventListener('click', () => { dispalyDialog(UseCaseOption.CREATE_CHART) })
}