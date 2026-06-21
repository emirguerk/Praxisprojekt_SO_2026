import "../styles/reset.css"
import "../styles/viables.css"
import "../styles/basic.css"
import "../styles/components/statusBar.css"

export function initDialogStyles(){
    setTimeout(() => {
        const step = document.querySelector('status-bar > ol') as HTMLElement
        step.style.setProperty("--progress-width", "66.66%")
    }, 5000)
}