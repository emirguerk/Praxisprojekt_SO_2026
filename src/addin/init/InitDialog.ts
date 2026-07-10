import { LoadingOption } from "../enums/LoadingOption"

export function initDialog(){
    const root = document.querySelector('#root') as HTMLElement
    
    root.innerHTML = `
        <header>
            <status-bar></status-bar>
        </header>
        <main>
            <custom-loading type="${LoadingOption.LOAD}"></custom-loading>
        </main>
    `

    // Wait for Events and Components are laoded
    setTimeout(changeLoadingState, 3500)
}

function changeLoadingState(){
    const root = document.querySelector('#root') as HTMLElement

    root.innerHTML = `
        <header>
            <status-bar></status-bar>
        </header>
        <main>
            <header-action-bar></header-action-bar>
            <div id="content-container">
                <custom-content workflow="0"></custom-content>
            </div>
        </main>
        <footer>
            <footer-navigation></footer-navigation>
        </footer>
    `
}