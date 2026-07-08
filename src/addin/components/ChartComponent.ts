import { ApexOptions } from "apexcharts";
import { ChartInstance } from "../classes/Chart";

class ChartComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `        
            <figure id="chart"></figure>
        `

        const currentChartType = ChartInstance.getCurrentChartType()
        const currentChartData = ChartInstance.getChartData()

        ChartInstance.initChart(currentChartData as ApexOptions, currentChartType)
    }
}

customElements.define('custom-chart', ChartComponent)