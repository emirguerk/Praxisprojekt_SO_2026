import ApexCharts, { ApexOptions } from "apexcharts"
import { ChartTypes } from "../enums/ChartType"
import { IBarOrLineChartData, IDonutChartData } from "../types/IChartData"

class Chart{
    private _isActive: boolean = false
    private _currentChartType : ChartTypes
    private _apexChartsInstance ?: ApexCharts
    private _chartDataMap : Map<string, number[]> = new Map()

    constructor(){
        this._chartDataMap.set("Beispiel 1", [1, 2, 3])
        this._chartDataMap.set("Beispiel 2", [1, 2, 3])
        this._currentChartType = ChartTypes.BAR
    }

    public initChart(chartOption ?: ApexOptions, chartType?: ChartTypes){
        this._apexChartsInstance = new ApexCharts(
            document.querySelector('#chart') as HTMLElement, 
            chartOption ?? this.getDefaultChartData(this.getChartTypeLowerCase(ChartTypes.BAR)) as ApexOptions
        )

        this.renderChart()
        this._isActive = true
        this._currentChartType = chartType ?? ChartTypes.BAR
    }

    public updateMapKeys(oldValue: string, newValue: string){
        const newMap = new Map<string, number[]>();

        for (const [key, value] of this._chartDataMap) {
            newMap.set(
                key === oldValue ? newValue : key,
                value
            );
        }
        
        this._chartDataMap = newMap;

        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    public updateMapData(key: string, newData: number[]){
        this._chartDataMap.set(key, newData)
        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    private updateChartView(){
        if(this._currentChartType === ChartTypes.DONUT){
            this._apexChartsInstance?.updateOptions({
                series: this.getDonutSeriesList(),
                labels: this.getLabelsList()
            })
        } else {            
            this._apexChartsInstance?.updateOptions({
                series: this.getSeriesList()
            })
        }
    }

    public convertToBarChart(){
        const defaultChartData = this.getDefaultChartData(this.getChartTypeLowerCase(ChartTypes.BAR))

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData as ApexOptions, ChartTypes.BAR)
    }

    public convertToLineChart(){
        const defaultChartData = this.getDefaultChartData(this.getChartTypeLowerCase(ChartTypes.LINE))

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData as ApexOptions, ChartTypes.LINE)
    }

    public convertToDonutChart(){
        const donutChartData = this.getDonutChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(donutChartData as ApexOptions, ChartTypes.DONUT)
    }

    public renderChart(){
        this._apexChartsInstance?.render()
    }

    public destroyChart(){
        this._apexChartsInstance?.destroy()
        this._isActive = false
    }

    public getChartData(){
        const currentChartType = this.getCurrentChartType()
        
        switch(currentChartType){
            case ChartTypes.BAR:
                return this.getDefaultChartData(ChartInstance.getChartTypeLowerCase(ChartTypes.BAR))
            case ChartTypes.DONUT:
                return this.getDonutChartData()
            case ChartTypes.LINE:
                return this.getDefaultChartData(ChartInstance.getChartTypeLowerCase(ChartTypes.BAR))
            default:
                throw Error(`${currentChartType} is not found.`)
        }
    }

    public getCurrentChartType(): ChartTypes{
        return this._currentChartType
    }

    public getChartIsDestroyed(){
        return !this._isActive
    }

    private getDefaultChartData(chartType: 'bar' | 'line' | 'donut'): IBarOrLineChartData {
        return {
            chart: this.getChartObject(chartType),
            series: this.getSeriesList(),
            xaxis: this. getXaxisObject()
        } as IBarOrLineChartData
    }

    private getDonutChartData(): IDonutChartData {
        return {
            chart: this.getChartObject(this.getChartTypeLowerCase(ChartTypes.DONUT)),
            series: this.getDonutSeriesList(),
            labels: this.getLabelsList()
        } as IDonutChartData
    }

    private getChartObject(chartType: 'bar' | 'line' | 'donut'){
        return { type: chartType, toolbar: { show: false } }
    }

    private getDonutSeriesList(){
        return [...this._chartDataMap].map(([name, data]) => data[0])
    }

    private getSeriesList(){
        return [...this._chartDataMap].map(([name, data]) => ({ name: name, data: data }))
    }

    private getLabelsList(){
        return [...this._chartDataMap].map(([name]) => name)
    }

    private getXaxisObject(){
        const seriesListFirstChild = this.getSeriesList()[0]
        const categories = seriesListFirstChild.data.map((value, index) => `#${index + 1}`)

        return { categories: categories }
    }

    private getChartTypeLowerCase(chartType: ChartTypes): 'bar' | 'donut' | 'line' {
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
