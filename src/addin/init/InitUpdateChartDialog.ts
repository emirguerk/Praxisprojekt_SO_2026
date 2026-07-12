import { UseCaseOption } from "../enums/UseCase"
import { dispalyDialog } from "../functions/DisplayDialog"

export function initUpdateChartDialog(){
    const newChartDialogButton = document.querySelector('#update-chart-dialog-button')
    newChartDialogButton?.addEventListener('click', () => { dispalyDialog(UseCaseOption.UPDATE_CHART) })
}