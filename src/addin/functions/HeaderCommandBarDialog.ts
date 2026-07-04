import { ApexOptions } from "apexcharts";
import { ChartInstance } from "../classes/Chart";
import { dropdownDialog } from "./DropdownDialog";
import { tableIsValid } from "./TabelDialog";
import { IMessageDialog } from "../types/IMessageDialog";

export function headerCommandBarDialog(){
    dropdownDialog()
    updateView()
}

function updateView(){
    const { errorDialog, updateViewButton } = getHeaderCommandBarElements()

    updateViewButton.addEventListener('click', () => {
        const getTableIsValid = tableIsValid()

        if(getTableIsValid){
            const currentChartType = ChartInstance.getCurrentChartType()
            const chartData = ChartInstance.getChartData()
            const chartIsDestroyed = ChartInstance.getChartIsDestroyed()

            const chart = document.querySelector('#chart') as HTMLElement
            if(chartIsDestroyed)
                chart.innerHTML = ``
            else
                ChartInstance.destroyChart()

            ChartInstance.initChart(chartData as ApexOptions, currentChartType)
        } else {
            errorDialog.classList.add('is-visible')
        }
    })
}


function getHeaderCommandBarElements(){
    const errorDialog = document.querySelector('message-dialog') as IMessageDialog
    const updateViewButton = document.querySelector('#update-view-button') as HTMLElement

    return{
        errorDialog, updateViewButton
    }
}
