import { ChartInstance } from "../classes/Chart";

class ChartComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <figure id="chart"></figure> 
        `

        ChartInstance.initChart()
        ChartInstance.renderChart()
    }
}

customElements.define('custom-chart', ChartComponent)