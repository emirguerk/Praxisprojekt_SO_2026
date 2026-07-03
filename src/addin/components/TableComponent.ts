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
                        <td><input type="text" pattern="^[0-9]+$" value="1" required></td>
                        <td><input type="text" pattern="^[0-9]+$" value="1" required></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#2</th>
                        <td><input type="text" pattern="^[0-9]+$" value="2" required></td>
                        <td><input type="text" pattern="^[0-9]+$" value="2" required></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#3</th>
                        <td><input type="text" pattern="^[0-9]+$" value="3" required></td>
                        <td><input type="text" pattern="^[0-9]+$" value="3" required></td>
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