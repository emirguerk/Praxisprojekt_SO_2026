// Components
import "./components/StatusBarComponent"
import "./components/HeaderCommandBarComponent"
import "./components/TableComponent"

// Imports
import { initDialogStyles } from "./init/InitDialogStyles"

Office.onReady().then(() => {
    initDialogStyles()
})