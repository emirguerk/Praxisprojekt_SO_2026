import { WorkflowInstance } from "../classes/Workflow";
import { WorkflowType } from "../enums/WorkflowType";
import { IFooterNavigationBar } from "../types/IFooterNavigationBar";
import { tableDialog } from "./TabelDialog";

export function footerNavigationDialog(){
    const { backButton, nextButton, insertButton } = getFooterNavigationElements()

    backButton.addEventListener("click", () => {        
        if(WorkflowInstance.getCurrentWorkflow() !== WorkflowType.EDIT_CHART)
            return

        WorkflowInstance.backWorkflow()
        startEditTableWorkflow()
    })

    nextButton.addEventListener("click", () => {        
        WorkflowInstance.nextWorkflow()
        startEditChartWorkflow()
    })

    insertButton.addEventListener("click", () => {
        WorkflowInstance.nextWorkflow()
        startInserChartWorkflow()
    })
}

function startEditTableWorkflow(){
    const { backButton, nextButton, insertButton, content } = getFooterNavigationElements()

    backButton.classList.add("disabled")
    nextButton.style.setProperty("display", "block")
    insertButton.style.setProperty("display", "none")

    content.innerHTML = `<custom-content workflow="${WorkflowType.EDIT_TABLE}"></custom-content>`
}

function startEditChartWorkflow(){
    const { backButton, nextButton, insertButton, content } = getFooterNavigationElements()

    backButton.classList.remove("disabled")
    nextButton.style.setProperty("display", "none")
    insertButton.style.setProperty("display", "block")

    content.innerHTML = `<custom-content workflow="${WorkflowType.EDIT_CHART}"></custom-content>`
}

function startInserChartWorkflow(){
    const { backButton, nextButton, insertButton, main } = getFooterNavigationElements()

    backButton.style.setProperty("display", "none")
    nextButton.style.setProperty("display", "none")
    insertButton.style.setProperty("display", "none")

    main.innerHTML = `
            <div id="content-container">
                <custom-content workflow="${WorkflowType.INSERT_CHART}"></custom-content>
            </div>
        `
}


function getFooterNavigationElements(){
    const footerNavigation = document.querySelector("footer-navigation") as IFooterNavigationBar
    const backButton = footerNavigation.querySelector("#back-button") as HTMLElement
    const nextButton = footerNavigation.querySelector("#next-button") as HTMLElement
    const insertButton = footerNavigation.querySelector("#insert-button") as HTMLElement
    const content = document.querySelector('#content-container') as HTMLElement
    const main = document.querySelector('main') as HTMLElement

    return {
        footerNavigation,
        backButton,
        nextButton,
        insertButton,
        content,
        main
    }
}