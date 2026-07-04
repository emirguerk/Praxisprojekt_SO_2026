import { WorkflowInstance } from "../classes/Workflow";
import { WorkflowType } from "../enums/WorkflowType";
import { IFooterNavigationBar } from "../types/IFooterNavigationBar";

export function footerNavigationDialog(){
    const footerNavigation = document.querySelector("footer-navigation") as IFooterNavigationBar
    const backButton = footerNavigation.querySelector("#back-button") as HTMLElement
    const nextButton = footerNavigation.querySelector("#next-button") as HTMLElement
    const insertButton = footerNavigation.querySelector("#insert-button") as HTMLElement

    backButton.addEventListener("click", () => {        
        if(WorkflowInstance.getCurrentWorkflow() !== WorkflowType.EDIT_CHART)
            return

        WorkflowInstance.backWorkflow()

        backButton.classList.add("disabled")
        nextButton.style.setProperty("display", "block")
        insertButton.style.setProperty("display", "none")
    })

    nextButton.addEventListener("click", () => {        
        WorkflowInstance.nextWorkflow()

        backButton.classList.remove("disabled")
        nextButton.style.setProperty("display", "none")
        insertButton.style.setProperty("display", "block")
    })

    insertButton.addEventListener("click", () => {
        WorkflowInstance.nextWorkflow()

        backButton.style.setProperty("display", "none")
        insertButton.style.setProperty("display", "none")
    })
}