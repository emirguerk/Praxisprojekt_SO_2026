// Components
import "./components/StatusBarComponent"

// Imports
import { initDialogStyles } from "./init/InitDialogStyles"

Office.onReady().then(() => {
    initDialogStyles()
})