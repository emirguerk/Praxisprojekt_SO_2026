import { ChartTypes } from "../enums/ChartType"
import { IChartOptions, IText } from "./IChartData"

export type IImageData = {
    id: string,
    chartDataMap: [string, number[]][],
    chartType: ChartTypes,
    title: IText,
    description: IText,
    chartOptions: IChartOptions
}