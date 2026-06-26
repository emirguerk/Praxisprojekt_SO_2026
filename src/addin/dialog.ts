// Components
import "./components/StatusBarComponent"
import "./components/HeaderCommandBarComponent"

// Imports
import { initDialogStyles } from "./init/InitDialogStyles"

Office.onReady().then(() => {
    initDialogStyles()
})