import { WorkflowInstance } from "../classes/Workflow";
import { startEditChartWorkflow } from "./FooterNavigationDialog";

let intervalId: ReturnType<typeof setInterval>;

export function loadingDialog(){
    const button = document.querySelector('#cancle-insert')

    if(button){
        button.addEventListener('click', () => {
            WorkflowInstance.backWorkflow()
            startEditChartWorkflow()
        })
    }

    const points = document.querySelector('div #point-state') as HTMLElement
    intervalId = setInterval(() => {
        points.textContent.length === 3 
        ? points.textContent = '.'
        : points.textContent += '.'
    }, 500)
}

export function disconnectLoadingDialog(){
    clearInterval(intervalId)
}