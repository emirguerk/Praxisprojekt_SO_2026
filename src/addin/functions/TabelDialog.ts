import { ChartInstance } from "../classes/Chart"

const tableElement = document.querySelector('table') as HTMLElement
const tableHead = tableElement.querySelector('thead tr') as HTMLElement
const tableBody = tableElement.querySelector('tbody') as HTMLElement

const theadInput = tableHead.querySelectorAll('input') as NodeListOf<Element>
const tBodyTr = tableBody.querySelectorAll('tr') as NodeListOf<Element>

const addTableRow = tableElement.querySelector('#add-table-row-button') as HTMLElement
const addTableCol = tableElement.querySelector('#add-table-col-button') as HTMLElement

export function tableDialog(){
    addTabelColEvent()
    addTableRowEvent()
    changeCaptionEvent()
    changeContentEvent()
}

export function tableIsValid(): Boolean{
    const tableInput = document.querySelectorAll('table tbody input') as NodeListOf<Element>
    return [...tableInput].every(input => (input as HTMLInputElement).checkValidity());
}

function refreshTableEvent(){
    const tableElement = document.querySelector('table') as HTMLElement
    const tableHead = tableElement.querySelector('thead tr') as HTMLElement
    const tableBody = tableElement.querySelector('tbody') as HTMLElement
    const theadInput = tableHead.querySelectorAll('input') as NodeListOf<Element>
    const tBodyTr = tableBody.querySelectorAll('tr') as NodeListOf<Element>

    changeCaptionEvent(theadInput)
    changeContentEvent(theadInput, tBodyTr)
}

function updateChartData(){
    const tableElement = document.querySelector('table') as HTMLElement
    const tableHead = tableElement.querySelector('thead tr') as HTMLElement
    const theadInput = tableHead.querySelectorAll('input') as NodeListOf<Element>
    const tBodyTr = tableBody.querySelectorAll('tr') as NodeListOf<Element>

    theadInput.forEach((theadInput, columnIndex) => {
        const inputElemnt = theadInput as HTMLInputElement;
        const key = inputElemnt.value
        const value: number[] = []

        collectCurrentTableData(tBodyTr, columnIndex, value)
        ChartInstance.updateMapData(key, value)
    })
}

function changeCaptionEvent(theadInputparameter: NodeListOf<Element> = theadInput){
    theadInputparameter.forEach((input) => {
        const inputElemnt = input as HTMLInputElement;

        let currentValue: string;

        inputElemnt.addEventListener('focus', () => { currentValue = inputElemnt.value })

        inputElemnt.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;

            if(currentValue === target.value)
                return

            if(target.value === ""){
                target.value = "Undefiend"
            }

            ChartInstance.updateMapKeys(currentValue, target.value)
        })
    })
}

function changeContentEvent(theadInputparameter: NodeListOf<Element> = theadInput, tBodyTrParameter: NodeListOf<Element> = tBodyTr){
    theadInputparameter.forEach((theadInput, columnIndex) => {
        const inputElemnt = theadInput as HTMLInputElement;
        const key = inputElemnt.value
        const value: number[] = []

        collectCurrentTableData(tBodyTrParameter, columnIndex, value)
        executeChangeEvent(tBodyTrParameter, columnIndex, key, value)
    })
}

function collectCurrentTableData(tBodyTrParameter: NodeListOf<Element> = tBodyTr, columnIndex: number, value: number[]){
    tBodyTrParameter.forEach((tBodyTr) => {
        const allInputs = tBodyTr.querySelectorAll('input') as NodeListOf<Element>

        // break last row
        if(allInputs.length === 0){
            return
        }

        const currentInput = allInputs[columnIndex] as HTMLInputElement
        const valueIsEmpty = currentInput.value === ""

        value.push(!valueIsEmpty ? parseInt(currentInput.value) : 0)
    })
}

function executeChangeEvent(tBodyTrParameter: NodeListOf<Element> = tBodyTr, columnIndex: number, key: string, value: number[]){
    tBodyTrParameter.forEach((tBodyTr, rowIndex) => {
        const allInputs = tBodyTr.querySelectorAll('input') as NodeListOf<Element>

        // break last row
        if(allInputs.length === 0){
            return
        }

        const currentInput = allInputs[columnIndex] as HTMLInputElement
        
        let currentValue: string;

        currentInput.addEventListener("invalid", () => {
            const errorDialog = document.querySelector('.message-dialog-container') as HTMLElement
            const chart = document.querySelector('#chart') as HTMLElement

            ChartInstance.destroyChart()
            chart.innerHTML = `
                    <span style="text-align: center">
                        Please fix table errors first.<br>Then click on <strong>Update View</strong>.
                    <span>
                `

            errorDialog.classList.add('is-visible')
        })

        currentInput.addEventListener('focus', () => { currentValue = currentInput.value })

        currentInput.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;

            if(currentValue === target.value || !currentInput.checkValidity())
                return

            value[rowIndex] = parseInt(target.value)
            ChartInstance.updateMapData(key, value)
        })
    })
}

function addTabelColEvent(tableElementParameter: HTMLElement = tableElement, tableHeadParameter: HTMLElement = tableHead, addTableColParameter: HTMLElement = addTableCol){
    addTableCol.addEventListener('click', () => {        
        const allTabelCols = tableElementParameter.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = tableElementParameter.querySelectorAll('tbody tr') as NodeListOf<Element>

        const addTargetCol = allTabelCols[allTabelCols.length -1]

        const newCol = document.createElement('th')
        newCol.setAttribute('scope', 'col')
        newCol.innerHTML = `
            <input type="text" value="Beispiel ${allTabelCols.length -1}">
        `

        tableHeadParameter.insertBefore(newCol, addTargetCol)

        allTableRows.forEach((row, index) => {
            const allRowData = row.querySelectorAll('td') as NodeListOf<Element>
            const addTargetTdElement = allRowData[allRowData.length -1]

            const newtd = document.createElement('td')

            if (index !== allTableRows.length -1) {
                newtd.innerHTML = `
                    <input type="text" pattern="^[0-9]+$" value="0" required>
                `
            }

            row.insertBefore(newtd, addTargetTdElement)
        })
        
        ChartInstance.updateMapData(`Beispiel ${allTabelCols.length -1}`, new Array(allTableRows.length -1).fill(0))
        refreshTableEvent()
    })
}

function addTableRowEvent(tableElementParameter: HTMLElement = tableElement, tableBodyParameter: HTMLElement = tableBody, addTableRowParameter: HTMLElement = addTableRow){
    addTableRowParameter.addEventListener('click', () => {
        const allTabelCols = tableElementParameter.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = tableElementParameter.querySelectorAll('tbody tr') as NodeListOf<Element>
        const addTargetRow = allTableRows[allTableRows.length -1]

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th colspan="row">#${allTableRows.length}</th>
        `;

        allTabelCols.forEach((col, index) => {
            if (index === 0) 
                return

            const newTd = document.createElement('td')
            
            if (index !== allTabelCols.length -1){
                newTd.innerHTML = `
                    <input type="text" pattern="^[0-9]+$" value="0" required>
                `
            }

            newRow.appendChild(newTd)
        })

        tableBodyParameter.insertBefore(newRow, addTargetRow)
        updateChartData()
        refreshTableEvent()
    })
}