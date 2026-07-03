import { ChartInstance } from "../classes/Chart"
import { ChartTypes } from "../enums/ChartType"
import { tableIsValid } from "./TabelDialog"

export function dropdownDialog(){
    const dropdownContainer = document.querySelector('.dropdown-container') as HTMLElement
    const button = dropdownContainer.querySelector('button') as HTMLElement

    const chartType = button.querySelector('#chart-type') as HTMLElement
    const dropdownButtons = dropdownContainer.querySelectorAll('.dropdown > li > button') as NodeListOf<HTMLElement>

    toggleDropdown(button, dropdownContainer)
    toggleDropdownButton(dropdownButtons, chartType, dropdownContainer)
}

function getNewChartType(button: HTMLElement): ChartTypes {
    switch (button.textContent) {
        case 'Bar':
            return ChartTypes.BAR
        case 'Donut':
            return ChartTypes.DONUT
        case 'Line':
            return ChartTypes.LINE
        default:
            return ChartTypes.BAR
    }
}

function toggleDropdownButton(dropdownButtons: NodeListOf<HTMLElement>, chartType: HTMLElement, dropdownContainer: HTMLElement){
    dropdownButtons.forEach((dropDownButton) => {
        dropDownButton.addEventListener('click', () => {
            const newNewChartType = getNewChartType(dropDownButton)
            
            chartType.textContent = newNewChartType
            convertChart(newNewChartType)

            dropdownContainer.classList.toggle('is-visible')
        })
    })
}

function convertChart(chartType: ChartTypes){
    chartType === ChartTypes.BAR
    ? ChartInstance.convertToBarChart()
    : chartType === ChartTypes.DONUT
    ? ChartInstance.convertToDonutChart()
    : ChartInstance.convertToLineChart()
}

function toggleDropdown(button : HTMLElement, dropdownContainer: HTMLElement){
    const errorDialog = document.querySelector('.message-dialog-container') as HTMLElement

    button.addEventListener('click', () => {
        const getTableIsValid = tableIsValid()
        
        if(getTableIsValid){
            dropdownContainer.classList.toggle('is-visible')
        } else {
            errorDialog.classList.add('is-visible')
        }
    })
}