import { ChartInstance } from "../classes/Chart"
import { IMessageDialog } from "../types/IMessageDialog"

export function createTableHtml(): string{
    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")

    const chartMapKeys = ChartInstance.getChartMapKeys()

    const headerRow = document.createElement("tr")

    headerRow.appendChild(document.createElement("th"))

    for (const key of chartMapKeys) {
        const th = document.createElement("th");
        th.innerHTML = `<input type="text" value="${key}">`
        headerRow.appendChild(th)
    }

    const addTh = document.createElement("th")
    addTh.innerHTML = `
        <button class="button secondary-button" id="add-table-col-button">Add</button>
    `

    headerRow.appendChild(addTh)
    thead.appendChild(headerRow)

    const chartMapValues = [...ChartInstance.getChartMapValues()]

    const rowCount = chartMapValues[0]?.length

    for (let i = 0; i < rowCount; i++) {
        const tr = document.createElement("tr")

        const th = document.createElement("th")
        th.textContent = `#${i + 1}`;
        tr.appendChild(th);

        for (const col of chartMapValues) {
            const td = document.createElement("td")
            td.innerHTML = `
                <input type="text"
                       pattern="^[0-9]+$"
                       value="${col[i] ?? 0}"
                       required>
            `
            tr.appendChild(td)
        }

        tr.appendChild(document.createElement("td"))

        tbody.appendChild(tr)
    }

    const addRowTr = document.createElement("tr")
    const addRowTh = document.createElement("th")
    addRowTh.innerHTML = `
        <button class="button secondary-button" id="add-table-row-button">
            Add
        </button>
    `

    addRowTr.appendChild(addRowTh)

    for (let i = 0; i < chartMapValues.length; i++) {
        addRowTr.appendChild(document.createElement("td"))
    }

    tbody.appendChild(addRowTr)

    table.appendChild(thead)
    table.appendChild(tbody)

    return table.outerHTML
}

export function tableDialog(){
    addTableColEvent()
    addTableRowEvent()
    changeCaptionEvent()
    changeContentEvent()
}

export function tableIsValid(): Boolean{
    const tableInput = document.querySelectorAll('table tbody input') as NodeListOf<Element>
    return [...tableInput].every(input => (input as HTMLInputElement).checkValidity());
}

function refreshInputEvents(){
    changeCaptionEvent()
    changeContentEvent()
}

function updateChartData(){
    const { headInputs } = getTableElements()

    headInputs.forEach((theadInput, columnIndex) => {
        const inputElemnt = theadInput as HTMLInputElement;
        const key = inputElemnt.value
        const value: number[] = []

        collectCurrentTableData(columnIndex, value)
        ChartInstance.updateMapData(key, value)
    })
}

function changeCaptionEvent(){
    const { headInputs } = getTableElements()

    headInputs.forEach((input) => {
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

function changeContentEvent(){
    const { headInputs } = getTableElements()

    headInputs.forEach((theadInput, columnIndex) => {
        const inputElemnt = theadInput as HTMLInputElement;
        const key = inputElemnt.value
        const value: number[] = []

        collectCurrentTableData(columnIndex, value)
        executeChangeEvent(columnIndex, key, value)
    })
}

function collectCurrentTableData(columnIndex: number, value: number[]){
    const { bodyTrs } = getTableElements()

    bodyTrs.forEach((tBodyTr) => {
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

function executeChangeEvent(columnIndex: number, key: string, value: number[]){
    const { bodyTrs } = getTableElements()

    bodyTrs.forEach((tBodyTr, rowIndex) => {
        const allInputs = tBodyTr.querySelectorAll('input') as NodeListOf<Element>

        // break last row
        if(allInputs.length === 0){
            return
        }

        const currentInput = allInputs[columnIndex] as HTMLInputElement
        
        let currentValue: string;

        currentInput.addEventListener("invalid", () => {
            const errorDialog = document.querySelector('message-dialog') as IMessageDialog
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

function addTableColEvent(){
    const { table, head ,addColButton } = getTableElements()

    addColButton.addEventListener('click', () => {        
        const allTabelCols = table.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = table.querySelectorAll('tbody tr') as NodeListOf<Element>

        const addTargetCol = allTabelCols[allTabelCols.length -1]

        const newCol = document.createElement('th')
        newCol.setAttribute('scope', 'col')
        newCol.innerHTML = `
            <input type="text" value="Beispiel ${allTabelCols.length -1}">
        `

        head.insertBefore(newCol, addTargetCol)

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
        refreshInputEvents()
    })
}

function addTableRowEvent(){
    const { table, body, addRowButton } = getTableElements()
    
    addRowButton.addEventListener('click', () => {
        const allTabelCols = table.querySelectorAll('thead th') as NodeListOf<Element>
        const allTableRows = table.querySelectorAll('tbody tr') as NodeListOf<Element>
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

        body.insertBefore(newRow, addTargetRow)
        updateChartData()
        refreshInputEvents()
    })
}

function getTableElements() {
    const table = document.querySelector('table') as HTMLElement
    const head = table.querySelector('thead tr') as HTMLElement
    const body = table.querySelector('tbody') as HTMLElement

    const headInputs = head.querySelectorAll('input') as NodeListOf<Element>
    const bodyTrs = body.querySelectorAll('tr') as NodeListOf<Element>

    const addRowButton = table.querySelector('#add-table-row-button') as HTMLElement
    const addColButton = table.querySelector('#add-table-col-button') as HTMLElement

    return {
        table,
        head,
        headInputs,
        body,
        bodyTrs,
        addRowButton,
        addColButton,
    }
}