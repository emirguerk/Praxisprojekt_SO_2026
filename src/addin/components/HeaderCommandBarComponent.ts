class HeaderCommandBarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
                <a class="link" href="">Need Help?</a>
            </nav>
            <ul>
                <li><button id="update-view-button" class="button secondary-button">Update View</button></li>
                <li class="dropdown-container">
                    <button class="button secondary-button">Chart-type: <span id="chart-type">Bar</span></button>
                    <ul class="dropdown">
                        <li><button class="button secondary-button">Bar</button></li>
                        <li><button class="button secondary-button">Donut</button></li>
                        <li><button class="button secondary-button">Line</button></li>
                    </ul>
                </li>
            </ul>
        `
    }
}

customElements.define('header-action-bar', HeaderCommandBarComponent)