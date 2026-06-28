class TableComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <table>
                <thead>
                    <th scope="col"></th>
                    <th scope="col"><input type="text" value="Beipsiel 1"></th>
                    <th scope="col"><input type="text" value="Beipsiel 2"></th>
                    <th id="add-table-col" scope="col"><button class="button secondary-button">Add</button></th>
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
                        <th colspan="row"><button class="button secondary-button">Add</button></th>
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