import "./components/StatusBarComponent"
import { initDialogStyles } from "./init/InitDialogStyles"

Office.onReady().then(() => {
    initDialogStyles()
})