import { ChartInstance } from "../classes/Chart"
import { BarOption } from "../enums/BarOption"
import { ChartTypes } from "../enums/ChartType"
import { LineOption } from "../enums/LineOption"
import { IBarOptions, IDonutOptions, ILineOptions } from "../types/IChartData"

export function formDialog(){
    changeTitleEvent()
    changeDescriptionEvent()
    changeChartOptions()
}

function changeTitleEvent(){
    const { title } = getFormElements()

    title.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement
        ChartInstance.updateTitle(target.value)
    })
}

function changeDescriptionEvent(){
    const { description } = getFormElements()

    description.addEventListener('change', (event) => {
        const target = event.target as HTMLTextAreaElement
        ChartInstance.updateDescription(target.value)
    })
}

function changeChartOptions(){
    const { allRadioInputs } = getFormElements()

    allRadioInputs.forEach((input) => {

        input.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            const currentChartType = ChartInstance.getCurrentChartType()

            if(target.checked){
                switch(currentChartType){
                    case ChartTypes.BAR:
                        ChartInstance.updateChartOptions(getBarOptions(target.value))
                        break
                    case ChartTypes.DONUT:
                        ChartInstance.updateChartOptions(getDonutOptions(target.value))
                        break
                    case ChartTypes.LINE:
                        ChartInstance.updateChartOptions(getLineOptions(target.value))
                        break
                }
            }
        })
    })
}

function getBarOptions(value: string) : IBarOptions {
    if (value === BarOption.HORIZONTAL)
        return { bar: { horizontal: true } }
    
    return { bar: { horizontal: false } }
} 

function getDonutOptions(value: string) : IDonutOptions {
    const valueAsBool = Boolean(parseInt(value))
    
    if(valueAsBool)
        return { pie: { donut: { labels: { show: true, total: { show: true } } } } }

    return { pie: { donut: { labels: { show: false, total: { show: false } } } } }
} 

function getLineOptions(value: string) : ILineOptions {
    if(value === LineOption.STRAIGHT){
        return { curve: LineOption.STRAIGHT  }
    } else if(value === LineOption.SMOOTH){
        return { curve: LineOption.SMOOTH }
    } else {
        return { curve: LineOption.STEPLINE  }
    }
} 


function getFormElements(){
    const form = document.querySelector('form') as HTMLElement
    const title = form.querySelector('#title') as HTMLInputElement
    const description = form.querySelector('#description') as HTMLInputElement
    const allRadioInputs = form.querySelectorAll('#radio-container input') as NodeListOf<Element>
    
    return {
        title,
        description,
        allRadioInputs
    }
}