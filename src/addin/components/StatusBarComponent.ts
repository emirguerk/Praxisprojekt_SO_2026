import { WorkflowInstance } from "../classes/Workflow"

class StatusBarComponent extends HTMLElement {
    connectedCallback() {
        WorkflowInstance.init()

        this.innerHTML = `
            <ol>
                <li>Edit Table</li>
                <li>Edit Chart</li>
                <li>Insert Chart</li>
            </ol>
        `
    }
}

customElements.define('status-bar', StatusBarComponent)