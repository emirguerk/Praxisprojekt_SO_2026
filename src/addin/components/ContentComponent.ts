import { WorkflowOption } from "../enums/WorkflowOption"

class ContentComponent extends HTMLElement {
    connectedCallback() {
        const workflow = this.getAttribute('workflow') as string
        this.innerHTML = this.getHtml(parseInt(workflow))
    }

    private getHtml(currentWorkflow: WorkflowOption){
        switch(currentWorkflow){
            case WorkflowOption.EDIT_TABLE:
                return this.getEditTableWorkflowHtml()
            case WorkflowOption.EDIT_CHART:
                return this.getEditChartWorkflowHtml()
            case WorkflowOption.INSERT_CHART:
                return this.getInsertChartWorkflowHtml()
            default:
                throw Error(`${currentWorkflow} not found Workflow.`)
        }
    }

    private getEditTableWorkflowHtml(){
        return `
            <custom-table></custom-table>
            <custom-chart></custom-chart>
            <message-dialog type="error"></message-dialog>
        `
    }

    private getEditChartWorkflowHtml(){
        return `
            <custom-form></custom-form>
            <custom-chart></custom-chart>
            <message-dialog type="error"></message-dialog>
        `
    }

    private getInsertChartWorkflowHtml(){
        return `<custom-insert></custom-insert>`
    }
}

customElements.define('custom-content', ContentComponent)