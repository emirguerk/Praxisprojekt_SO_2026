class TableComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <table>
                <thead>
                    <th scope="col"></th>
                    <th scope="col"><input type="text" value="Beipsiel 1"></th>
                    <th scope="col"><input type="text" value="Beipsiel 2"></th>
                    <th scope="col"><input type="text" value="Beipsiel 3"></th>
                    <th id="add-table-col" scope="col"><button class="button secondary-button">Add</button></th>
                </thead>
                <tbody>
                    <tr>
                        <th colspan="row">#1</th>
                        <td><input type="text" value="Wert 1"></td>
                        <td><input type="text" value="Wert 1"></td>
                        <td><input type="text" value="Wert 1"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#2</th>
                        <td><input type="text" value="Wert 2"></td>
                        <td><input type="text" value="Wert 2"></td>
                        <td><input type="text" value="Wert 2"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#3</th>
                        <td><input type="text" value="Wert 3"></td>
                        <td><input type="text" value="Wert 3"></td>
                        <td><input type="text" value="Wert 3"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#4</th>
                        <td><input type="text" value="Wert 4"></td>
                        <td><input type="text" value="Wert 4"></td>
                        <td><input type="text" value="Wert 4"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#5</th>
                        <td><input type="text" value="Wert 5"></td>
                        <td><input type="text" value="Wert 5"></td>
                        <td><input type="text" value="Wert 1"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#6</th>
                        <td><input type="text" value="Wert 6"></td>
                        <td><input type="text" value="Wert 6"></td>
                        <td><input type="text" value="Wert 6"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#7</th>
                        <td><input type="text" value="Wert 7"></td>
                        <td><input type="text" value="Wert 7"></td>
                        <td><input type="text" value="Wert 7"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#8</th>
                        <td><input type="text" value="Wert 8"></td>
                        <td><input type="text" value="Wert 8"></td>
                        <td><input type="text" value="Wert 8"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#9</th>
                        <td><input type="text" value="Wert 9"></td>
                        <td><input type="text" value="Wert 9"></td>
                        <td><input type="text" value="Wert 9"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row">#10</th>
                        <td><input type="text" value="Wert 10"></td>
                        <td><input type="text" value="Wert 10"></td>
                        <td><input type="text" value="Wert 10"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="row"><button class="button secondary-button">Add</button></th>
                        <td></td>
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