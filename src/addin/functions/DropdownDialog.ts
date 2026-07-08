import { ChartInstance } from "../classes/Chart"
import { WorkflowInstance } from "../classes/Workflow"
import { ChartTypes } from "../enums/ChartType"
import { WorkflowType } from "../enums/WorkflowType"
import { tableIsValid } from "./TabelDialog"

export function dropdownDialog(){
    toggleDropdown()
    toggleDropdownButton()
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

function toggleDropdownButton(){
    const { dropdown, dropdownButtons, chartType } = getDropdownElements()

    dropdownButtons.forEach((dropDownButton) => {
        dropDownButton.addEventListener('click', () => {
            const currentWorkFlow = WorkflowInstance.getCurrentWorkflow()
            const newNewChartType = getNewChartType(dropDownButton)
            
            chartType.textContent = newNewChartType
            convertChart(newNewChartType)

            if(currentWorkFlow === WorkflowType.EDIT_CHART) {
                const contentContainer = document.querySelector('#content-container') as HTMLElement
                contentContainer.innerHTML = `
                    <custom-content workflow="${WorkflowType.EDIT_CHART}"></custom-content>
                `
            }
            
            dropdown.classList.toggle('is-visible')
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

function toggleDropdown(){
    const { dropdown, mainButton, errorDialog } = getDropdownElements()

    mainButton.addEventListener('click', () => {
        const chartIsDestroyed = ChartInstance.getChartIsDestroyed()
        const getTableIsValid = tableIsValid()
                
        if(getTableIsValid && !chartIsDestroyed){
            dropdown.classList.toggle('is-visible')
        } else {
            errorDialog.classList.add('is-visible')
        }
    })
}

function getDropdownElements(){
    const dropdown = document.querySelector('.dropdown-container') as HTMLElement
    const mainButton = dropdown.querySelector('button') as HTMLElement

    const chartType = mainButton.querySelector('#chart-type') as HTMLElement
    const dropdownButtons = dropdown.querySelectorAll('.dropdown > li > button') as NodeListOf<HTMLElement>
    const errorDialog = document.querySelector('.message-dialog-container') as HTMLElement

    return {
        dropdown,
        mainButton,
        chartType,
        dropdownButtons,
        errorDialog
    }
}