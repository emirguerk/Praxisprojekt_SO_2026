class TableComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <table>
                <thead>
                    <th scope="col"></th>
                    <th scope="col"><input type="text" value="Beispiel 1"></th>
                    <th scope="col"><input type="text" value="Beispiel 2"></th>
                    <th scope="col"><button class="button secondary-button" id="add-table-col-button">Add</button></th>
                </thead>
                <tbody>
                    <tr>
                        <th colspan="row">#1</th>
                        <td><input type="text" value="1"></td>
                        <td><input type="text" value="1"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#2</th>
                        <td><input type="text" value="2"></td>
                        <td><input type="text" value="2"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#3</th>
                        <td><input type="text" value="3"></td>
                        <td><input type="text" value="3"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row"><button class="button secondary-button" id="add-table-row-button">Add</button></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        `
    }
}

customElements.define('custom-table', TableComponent)