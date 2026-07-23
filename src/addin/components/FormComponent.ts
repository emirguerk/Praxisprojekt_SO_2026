import { ChartInstance } from "../classes/Chart"
import { ChartTypes } from "../enums/ChartType"
import { formDialog } from "../functions/FormDialog"

class FormComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = this.getHtml()
        formDialog()
    }

    private getHtml(){
        const currentChartType = ChartInstance.getCurrentChartType()

        switch(currentChartType){
            case ChartTypes.BAR:
                return this.getFormBarChartHtml()
            case ChartTypes.DONUT:
                return this.getFormDonutChartHtml()
            case ChartTypes.LINE:
                return this.getFormLineChartHtml()
            default:
                throw Error(`${currentChartType} not found in forms.`)
        }
    }

    private getFormBarChartHtml(){
        return `
            <form>
                ${this.defaultFormElementsHtml()}
                <label for="layout">Layout</label>
                <ul id="radio-container">
                    <li>
                        <input type="radio"
                            name="layout"
                            id="horizontal"
                            value="horizontal" />
                        <label for="horizontal">Horizontal</label>
                    </li>

                    <li>
                        <input type="radio"
                            name="layout"
                            id="vertical"
                            value="vertical" />
                        <label for="vertical">Vertical</label>
                    </li>
                </ul>
            </form>
        `
    }

    private getFormDonutChartHtml(){
        return `
            <form>
                ${this.defaultFormElementsHtml()}
                <label for="show-total">Show Total</label>
                <ul id="radio-container">
                    <li>
                        <input type="radio"
                            name="show-total"
                            id="no"
                            value="0" />
                        <label for="no">No</label>
                    </li>

                    <li>
                        <input type="radio"
                            name="show-total"
                            id="yes"
                            value="1" />
                        <label for="yes">Yes</label>
                    </li>
                </ul>
            </form>
        `
    }

    private getFormLineChartHtml(){
        return `
            <form>
                ${this.defaultFormElementsHtml()}
                <label for="line-type">Line Type</label>
                <ul id="radio-container">
                    <li>
                        <input type="radio"
                            name="line-type"
                            id="straight"
                            value="straight" />
                            <label for="straight">Straight</label>
                    </li>

                    <li>
                        <input type="radio"
                            name="line-type"
                            id="smooth"
                            value="smooth" />
                            <label for="smooth">Smooth</label>
                    </li>

                    <li>
                        <input type="radio"
                            name="line-type"
                            id="stepline"
                            value="stepline" />
                            <label for="stepline">Stepline</label>
                    </li>
                </ul>
            </form>
        `
    }

    private defaultFormElementsHtml(){
        const title = ChartInstance.getTitle().text
        const description = ChartInstance.getDescription().text

        return `
            <label for="title">Title</label>
            <input type="text"
                name="title"
                id="title"
                value="${title}" />
            
            <label for="description">Description</label>
            <textarea name="description"
                id="description">${description}</textarea>
        `
    }
}

customElements.define('custom-form', FormComponent)