import { ChartInstance } from "../classes/Chart"
import { ChartTypes } from "../enums/ChartType"

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

            ChartInstance.chartType = newNewChartType

            chartType.textContent = newNewChartType
            dropdownContainer.classList.toggle('is-visible')
        })
    })
}

function toggleDropdown(button : HTMLElement, dropdownContainer: HTMLElement){
    button.addEventListener('click', () => {
        dropdownContainer.classList.toggle('is-visible')
    })
}