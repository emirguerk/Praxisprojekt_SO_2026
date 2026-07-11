import ApexCharts, { ApexOptions } from "apexcharts"
import { ChartTypes } from "../enums/ChartType"
import { IBarOptions, IBarOrLineChartData, IChartOptions, IDonutChartData, IDonutOptions, ILineOptions, IText } from "../types/IChartData"
import { v4 as uuid } from "uuid"
import { decode, toBase64 } from 'js-base64'
import { IImageData } from "../types/IImageData"

class Chart{
    private _isActive: boolean = false
    private _id: string
    private _currentChartType : ChartTypes
    private _currentTitle : IText
    private _currentDescription: IText
    private _currentChartOptions: IChartOptions
    private _apexChartsInstance ?: ApexCharts
    private _chartDataMap : Map<string, number[]> = new Map()

    constructor(){
        this._id = uuid()
        this._chartDataMap.set("Beispiel 1", [1, 2, 3])
        this._chartDataMap.set("Beispiel 2", [1, 2, 3])
        this._currentChartType = ChartTypes.BAR
        this._currentTitle = { text: "" }
        this._currentDescription = { text: "" }
        this._currentChartOptions = { bar: { horizontal: false } }
    }

    public getImageDataAsBase64() :string {
        const imageData = {
            id: this._id,
            chartDataMap: Array.from(this._chartDataMap),
            chartType: this._currentChartType,
            title: this._currentTitle,
            description: this._currentDescription,
            chartOptions: this._currentChartOptions
        } as IImageData

        const json: string = JSON.stringify(imageData)
        return toBase64(json)
    }

    public async getImageAsBase64(): Promise<string | null> {
        const value = await this._apexChartsInstance?.dataURI();

        if (!value || !("imgURI" in value)) 
            return null

        const imgURI = value.imgURI;
        const base64 = imgURI.split(",")[1];

        return base64;
    }

    public initChartData(chartId: string, listOfBase64: string[]){
        for(const base64 of listOfBase64){
            const chartData = JSON.parse(decode(base64)) as IImageData

            if(chartData.id === chartId){
                this._id = chartData.id
                this._chartDataMap = new Map(chartData.chartDataMap)
                this._currentChartType = chartData.chartType
                this._currentTitle = chartData.title
                this._currentDescription = chartData.description
                this._currentChartOptions = chartData.chartOptions
                return
            }
        }
    }

    public initChart(chartOption ?: ApexOptions, chartType?: ChartTypes){
        this._apexChartsInstance = new ApexCharts(
            document.querySelector('#chart') as HTMLElement, 
            chartOption ?? this.getChartData() as ApexOptions
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

    public updateTitle(newTile: string){
        this._currentTitle = { text: newTile }
        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    public updateDescription(newDescription: string){
        this._currentDescription = { text: newDescription }
        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    public updateChartOptions(newChartOptions: IChartOptions){
        this._currentChartOptions = newChartOptions
        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    public updateMapData(key: string, newData: number[]){
        this._chartDataMap.set(key, newData)
        if(!this.getChartIsDestroyed()) this.updateChartView()
    }

    public getChartId(): string{
        return this._id
    }

    private updateChartView(){
        switch(this._currentChartType){
            case ChartTypes.BAR:
                this._apexChartsInstance?.updateOptions(this.getBarChartData())
                break
            case ChartTypes.DONUT:
                this._apexChartsInstance?.updateOptions(this.getDonutChartDataAsApextions())
                break
            case ChartTypes.LINE:
                this._apexChartsInstance?.updateOptions(this.getLineChartData())
                break
            default:
                throw Error(`${this._currentChartType} not found`)
        }
    }

    public convertToBarChart(){
        const defaultChartData = this.getBarChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData, ChartTypes.BAR)
    }

    public convertToLineChart(){
        const defaultChartData = this.getLineChartData()

        this._apexChartsInstance?.destroy()
        this.initChart(defaultChartData, ChartTypes.LINE)
    }

    public convertToDonutChart(){
        const donutChartData = this.getDonutChartDataAsApextions()

        this._apexChartsInstance?.destroy()
        this.initChart(donutChartData, ChartTypes.DONUT)
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
                return this.getBarChartData()
            case ChartTypes.DONUT:
                return this.getDonutChartDataAsApextions()
            case ChartTypes.LINE:
                return this.getLineChartData()
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

    public getChartMapKeys(){
        return this._chartDataMap.keys()
    }

    public getChartMapValues(){
        return this._chartDataMap.values()
    }

    private getBarChartData(){
        return {
            ...this.getDefaultChartData(this.getChartTypeLowerCase(ChartTypes.BAR)),
            plotOptions: this.getChartOptions() as IBarOptions
        } as ApexOptions
    }

    private getLineChartData(){
        return {
            ...this.getDefaultChartData(this.getChartTypeLowerCase(ChartTypes.LINE)),
            stroke: this.getChartOptions() as ILineOptions
        } as ApexOptions
    }

    private getDonutChartDataAsApextions(){
        return {
            ...this.getDonutChartData(),
            plotOptions: this.getChartOptions() as IDonutOptions
        } as ApexOptions
    }

    private getDefaultChartData(chartType: 'bar' | 'line' | 'donut'): IBarOrLineChartData {
        return {
            chart: this.getChartObject(chartType),
            series: this.getSeriesList(),
            xaxis: this. getXaxisObject(),
            title: this.getTitle(),
            subtitle: this.getDescription()
        } as IBarOrLineChartData
    }

    private getDonutChartData(): IDonutChartData {
        return {
            chart: this.getChartObject(this.getChartTypeLowerCase(ChartTypes.DONUT)),
            series: this.getDonutSeriesList(),
            labels: this.getLabelsList(),
            title: this.getTitle(),
            subtitle: this.getDescription()
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

    public getTitle(): IText{
        return this._currentTitle
    }

    public getDescription(): IText{
        return this._currentDescription
    }

    private getChartOptions(): IChartOptions {
        return this._currentChartOptions
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
