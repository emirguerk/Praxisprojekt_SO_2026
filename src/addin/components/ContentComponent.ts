import { WorkflowType } from "../enums/WorkflowType"

class ContentComponent extends HTMLElement {
    connectedCallback() {
        const workflow = this.getAttribute('workflow') as string
        this.innerHTML = this.getHtml(parseInt(workflow))
    }

    private getHtml(currentWorkflow: WorkflowType){
        switch(currentWorkflow){
            case WorkflowType.EDIT_TABLE:
                return this.getEditTableWorkflowHtml()
            case WorkflowType.EDIT_CHART:
                return this.getEditChartWorkflowHtml()
            case WorkflowType.INSERT_CHART:
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
        return `Insert`
    }
}

customElements.define('custom-content', ContentComponent)