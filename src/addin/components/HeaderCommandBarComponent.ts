import { WorkflowInstance } from "../classes/Workflow"
import { WorkflowOption } from "../enums/WorkflowOption"
import { headerCommandBarDialog } from "../functions/HeaderCommandBarDialog"

class HeaderCommandBarComponent extends HTMLElement {
    connectedCallback() {
        const apiUrl = process.env.API_URL
        const currurentWorkflow = WorkflowInstance.getCurrentWorkflow()
        const currentLink = currurentWorkflow === WorkflowOption.EDIT_TABLE ? "#edit-table-section" : "#edit-chart-section"
        
        this.innerHTML = `
            <nav>
                <a class="link" href="${apiUrl}/help.html${currentLink}" target="_blank">Need Help?</a>
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

        headerCommandBarDialog()
    }
}

customElements.define('header-action-bar', HeaderCommandBarComponent)