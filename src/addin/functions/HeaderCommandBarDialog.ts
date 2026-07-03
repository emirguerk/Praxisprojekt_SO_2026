import { ApexOptions } from "apexcharts";
import { ChartInstance } from "../classes/Chart";
import { dropdownDialog } from "./DropdownDialog";
import { tableIsValid } from "./TabelDialog";

export function headerCommandBarDialog(){
    dropdownDialog()
    updateView()
}

function updateView(){
    const errorDialog = document.querySelector('.message-dialog-container') as HTMLElement
    const updateViewButton = document.querySelector('#update-view-button') as HTMLElement

    updateViewButton.addEventListener('click', () => {
        const getTableIsValid = tableIsValid()

        if(getTableIsValid){
            const currentChartType = ChartInstance.getCurrentChartType()
            const chartData = ChartInstance.getChartData()

            const chart = document.querySelector('#chart') as HTMLElement
            chart.innerHTML = ``

            ChartInstance.initChart(chartData as ApexOptions, currentChartType)
        } else {
            errorDialog.classList.add('is-visible')
        }
    })
}
