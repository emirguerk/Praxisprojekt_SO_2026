import { WorkflowOption } from "../enums/WorkflowOption";

class Workflow{
    private _currentWorkflow: WorkflowOption;

    constructor(){
        this._currentWorkflow = WorkflowOption.EDIT_TABLE
    }

    public init(): WorkflowOption {
        return this.getCurrentWorkflow()
    }

    public backWorkflow(){
        this._currentWorkflow = this._currentWorkflow === WorkflowOption.EDIT_CHART ? WorkflowOption.EDIT_TABLE : WorkflowOption.EDIT_CHART
        this.updateStatusBar()
    }

    public nextWorkflow(){
        const currentWorkflow = this._currentWorkflow
        switch(currentWorkflow){
            case WorkflowOption.EDIT_TABLE:
                this._currentWorkflow = WorkflowOption.EDIT_CHART
                this.updateStatusBar()
                break
            case WorkflowOption.EDIT_CHART:
                this._currentWorkflow = WorkflowOption.INSERT_CHART
                this.updateStatusBar()
                break
            default:
                throw Error(`${currentWorkflow} not found`)
        }
    }

    private updateStatusBar(){
        const nextWorkflow = this._currentWorkflow
        const step = document.querySelector('status-bar > ol') as HTMLElement
        if(nextWorkflow === WorkflowOption.EDIT_TABLE){
            step.style.setProperty("--progress-width", "33.33%")
        } else if (nextWorkflow === WorkflowOption.EDIT_CHART)
            step.style.setProperty("--progress-width", "66.66%")
        else
            step.style.setProperty("--progress-width", "0%")
    }

    public getCurrentWorkflow(){
        return this._currentWorkflow
    }
}

export const WorkflowInstance = new Workflow()
