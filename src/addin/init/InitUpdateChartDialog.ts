import { UseCase } from "../enums/UseCase"
import { dispalyDialog } from "../functions/DisplayDialog"

export function initUpdateChartDialog(){
    const newChartDialogButton = document.querySelector('#update-chart-dialog-button')
    //const messageChild = {id: value}
    //newChartDialogButton?.addEventListener('click', () => dispalyDialog(messageChild))
    newChartDialogButton?.addEventListener('click', () => { dispalyDialog(UseCase.UPDATE_CHART) })
}