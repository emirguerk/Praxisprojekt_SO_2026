export type IBarOrLineChartData = {
    title: IText,
    subtitle: IText,
    chart: { type: string, toolbar: { show: boolean } },
    series: { name: string, data: number[] }[],
    xaxis: { categories: string[] }
}

export type IDonutChartData = {
    title: IText,
    subtitle: IText,
    chart: { type: string, toolbar: { show: boolean } },
    series: number[],
    labels: string[]
}

export type IChartOptions = IBarOptions | ILineOptions | IDonutOptions

export type IBarOptions = { bar: { horizontal: boolean } }
export type ILineOptions = { curve: string }
export type IDonutOptions = {  pie: { donut: { labels: { show: boolean, total: { show: boolean } } } } }

export type IText = {
    text: string
}