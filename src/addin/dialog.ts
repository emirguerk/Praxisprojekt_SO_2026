import { initDialog } from "./init/InitDialog"
import { initDialogComponents } from "./init/InitDialogComponents"
import { initDialogStyles } from "./init/InitDialogStyles"

Office.onReady().then(() => {
    initDialogStyles()
    initDialogComponents()
    initDialog()
})
