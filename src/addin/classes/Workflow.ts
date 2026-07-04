import { WorkflowType } from "../enums/WorkflowType";

class Workflow{
    private _currentWorkflow: WorkflowType;

    constructor(){
        this._currentWorkflow = WorkflowType.EDIT_TABLE
    }

    public init(): WorkflowType {
        return this.getCurrentWorkflow()
    }

    public backWorkflow(){
        this._currentWorkflow = WorkflowType.EDIT_TABLE
        this.updateStatusBar()
    }

    public nextWorkflow(){
        const currentWorkflow = this._currentWorkflow
        switch(currentWorkflow){
            case WorkflowType.EDIT_TABLE:
                this._currentWorkflow = WorkflowType.EDIT_CHART
                this.updateStatusBar()
                break
            case WorkflowType.EDIT_CHART:
                this._currentWorkflow = WorkflowType.INSERT_CHART
                this.updateStatusBar()
                break
            default:
                throw Error(`${currentWorkflow} not found`)
        }
    }

    private updateStatusBar(){
        const nextWorkflow = this._currentWorkflow
        const step = document.querySelector('status-bar > ol') as HTMLElement
        if(nextWorkflow === WorkflowType.EDIT_TABLE){
            step.style.setProperty("--progress-width", "33.33%")
        } else if (nextWorkflow === WorkflowType.EDIT_CHART)
            step.style.setProperty("--progress-width", "66.66%")
        else
            step.style.setProperty("--progress-width", "100%")
    }

    public getCurrentWorkflow(){
        return this._currentWorkflow
    }
}

export const WorkflowInstance = new Workflow()