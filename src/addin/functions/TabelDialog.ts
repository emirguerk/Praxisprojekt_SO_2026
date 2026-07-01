import { ChartInstance } from "../classes/Chart"

export function tableDialog(){
    const tableElement = document.querySelector('table') as HTMLElement
    const tableHead = tableElement.querySelector('thead tr') as HTMLElement
    const tableBody = tableElement.querySelector('tbody') as HTMLElement

    const addTableRow = tableElement.querySelector('#add-table-row-button') as HTMLElement
    const addTableCol = tableElement.querySelector('#add-table-col-button') as HTMLElement

    const theadInput = tableHead.querySelectorAll('input') as NodeListOf<Element>
    const tBodyTr = tableBody.querySelectorAll('tr') as NodeListOf<Element>

    changeCaptionEvent(theadInput)
    changeContentEvent(theadInput, tBodyTr)
    addTableRowEvent(tableElement, tableBody, addTableRow)
    addTabelColEvent(tableElement, tableHead, addTableCol)
}

function changeCaptionEvent(theadInput: NodeListOf<Element>){
    theadInput.forEach((input) => {
        const inputElemnt = input as HTMLInputElement;

        let currentValue: string;

        inputElemnt.addEventListener('focus', () => { currentValue = inputElemnt.value })

        inputElemnt.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;

            if(currentValue === target.value)
                return

            ChartInstance.updateMapKeys(currentValue, target.value)
        })
    })
}

function changeContentEvent(theadInput: NodeListOf<Element>, tBodyTr: NodeListOf<Element>){
    theadInput.forEach((theadInput, columnIndex) => {
        const inputElemnt = theadInput as HTMLInputElement;
        const key = inputElemnt.value
        const value: number[] = []

        // collect current body data
        tBodyTr.forEach((tBodyTr) => {
            const allInputs = tBodyTr.querySelectorAll('input') as NodeListOf<Element>

            // break last row
            if(allInputs.length === 0){
                return
            }

            const currentInput = allInputs[columnIndex] as HTMLInputElement
    
            value.push(parseInt(currentInput.value))
        })

        // execute change event
        tBodyTr.forEach((tBodyTr, rowIndex) => {
            const allInputs = tBodyTr.querySelectorAll('input') as NodeListOf<Element>

            // break last row
            if(allInputs.length === 0){
                return
            }

            const currentInput = allInputs[columnIndex] as HTMLInputElement
            
            let currentValue: string;

            currentInput.addEventListener('focus', () => { currentValue = currentInput.value })

            currentInput.addEventListener('change', (event) => {
                const target = event.target as HTMLInputElement;

                if(currentValue === target.value)
                    return

                value[rowIndex] = parseInt(target.value)

                console.log(value)

                ChartInstance.updateMapData(key, value)
            })

        })
    })
}

function addTabelColEvent(tableElement: HTMLElement, tableHead: HTMLElement, addTableCol: HTMLElement){
        addTableCol.addEventListener('click', () => {        
        const allTabelCols = tableElement.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = tableElement.querySelectorAll('tbody tr') as NodeListOf<Element>

        const addTargetCol = allTabelCols[allTabelCols.length -1]

        const newCol = document.createElement('th')
        newCol.setAttribute('scope', 'col')
        newCol.innerHTML = `
            <input type="text" value="">
        `

        tableHead.insertBefore(newCol, addTargetCol)

        allTableRows.forEach((row, index) => {
            const allRowData = row.querySelectorAll('td') as NodeListOf<Element>
            const addTargetTdElement = allRowData[allRowData.length -1]

            const newtd = document.createElement('td')

            if (index !== allTableRows.length -1) {
                newtd.innerHTML = `
                    <input type="text" value="">
                `
            }

            row.insertBefore(newtd, addTargetTdElement)
        })
    })
}

function addTableRowEvent(tableElement: HTMLElement, tableBody: HTMLElement, addTableRow: HTMLElement){
    addTableRow.addEventListener('click', () => {
        const allTabelCols = tableElement.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = tableElement.querySelectorAll('tbody tr') as NodeListOf<Element>
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
                    <input type="text" value="">
                `
            }

            newRow.appendChild(newTd)
        })

        tableBody.insertBefore(newRow, addTargetRow)
    })
}