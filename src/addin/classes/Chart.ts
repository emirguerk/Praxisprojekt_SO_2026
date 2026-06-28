import ApexCharts, { ApexOptions } from "apexcharts"
import { ChartTypes } from "../enums/ChartType"
import { IChartData, IDefaultChartData, IDonutChartData } from "../types/IChartData"

class Chart{
    private _apexChartsInstance ?: ApexCharts
    private _globalChartData : IChartData = {
        chart: { type: 'bar', toolbar: { show: false } },
        series: [
            { name: 'Beispiel 1', data: [1, 2, 3] }, 
            { name: 'Beispiel 2', data: [1, 2, 3] }
        ],
        labels: ['Beispiel 1', 'Beispiel 2'],
        xaxis: { categories: ["#1", "#2", "#3"] }
    }

    public initChart(chartOption ?: ApexOptions){
        this._apexChartsInstance = new ApexCharts(
            document.querySelector('#chart') as HTMLElement, 
            chartOption ?? this.getDefaultChartData() as ApexOptions
        )
    }

    public convertToBarChart(){
        this._globalChartData.chart.type = this.getChartTypeLowerCase(ChartTypes.BAR)
        const defaultChartData = this.getDefaultChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData as ApexOptions)
        this.renderChart()
    }

    public convertToLineChart(){
        this._globalChartData.chart.type = this.getChartTypeLowerCase(ChartTypes.LINE)
        const defaultChartData = this.getDefaultChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData as ApexOptions)
        this.renderChart()
    }

    public convertToDonutChart(){
        this._globalChartData.chart.type = this.getChartTypeLowerCase(ChartTypes.DONUT)
        const donutChartData = this.getDonutChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(donutChartData as ApexOptions)
        this.renderChart()
    }

    public renderChart(){
        this._apexChartsInstance?.render()
    }

    private getDefaultChartData(): IDefaultChartData {
        return {
            chart: this._globalChartData.chart,
            series: this._globalChartData.series.map((serie) => ({ name: serie.name, data: serie.data })),
            xaxis: this._globalChartData.xaxis
        } as IDefaultChartData
    }

    private getDonutChartData(): IDonutChartData {
        return {
            chart: this._globalChartData.chart,
            series: this._globalChartData.series.map((serie) => serie.data[0]),
            labels: this._globalChartData.labels,
            xaxis: this._globalChartData.xaxis
        } as IDonutChartData
    }

    private getChartTypeLowerCase(chartType: ChartTypes): string {
        switch(chartType){
            case ChartTypes.BAR:
                return 'bar'
            case ChartTypes.DONUT:
                return 'donut'
            case ChartTypes.LINE:
                return 'line'
            default:
                throw Error("CharType not found.")
        }
    }

}

export const ChartInstance = new Chart()
