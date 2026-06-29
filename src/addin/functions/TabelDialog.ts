export function tableDialog(){
    const tableElement = document.querySelector('table') as HTMLElement
    const tableBody = tableElement.querySelector('tbody') as HTMLElement
    const tableHead = tableElement.querySelector('thead tr') as HTMLElement

    const addTableRow = tableElement.querySelector('#add-table-row-button') as HTMLElement
    const addTableCol = tableElement.querySelector('#add-table-col-button') as HTMLElement

    addTableRowEvent(tableElement, tableBody, addTableRow)
    addTabelColEvent(tableElement, tableHead, addTableCol)

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