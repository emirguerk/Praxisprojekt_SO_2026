import { UseCase } from "../enums/UseCase"
import { dispalyDialog } from "../functions/DisplayDialog"

export function initCreateChartDialog(){
    const newChartDialogButton = document.querySelector('#new-chart-dialog-button')
    
    newChartDialogButton?.addEventListener('click', () => { dispalyDialog(UseCase.CREATE_CHART) })
}