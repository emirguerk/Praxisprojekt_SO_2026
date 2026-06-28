export type IChartData = {
    chart: { type: string, toolbar: { show: boolean } },
    series: { name: string, data: number[] }[],
    labels: string[],
    xaxis: { categories: string[] }
}

export type IBarOrLineChartData = {
    chart: { type: string, toolbar: { show: boolean } },
    series: { name: string, data: number[] }[],
    xaxis: { categories: string[] }
}

export type IDonutChartData = {
    chart: { type: string, toolbar: { show: boolean } },
    series: number[],
    labels: string[],
    xaxis: { categories: string[] }
}