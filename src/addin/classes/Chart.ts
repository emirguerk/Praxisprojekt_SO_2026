import { ChartTypes } from "../enums/ChartType"

class Chart{
    private _chartType : ChartTypes

    constructor(){
        this._chartType = ChartTypes.BAR
    }

    set chartType(chartType: ChartTypes){
        this._chartType = chartType
    }

    get json(): string {
        return JSON.stringify({ chartType: this._chartType })
    }
}

export const ChartInstance = new Chart()