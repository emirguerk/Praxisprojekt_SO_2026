import { initDialog } from "./init/InitDialog"
import { initDialogComponents } from "./init/InitDialogComponents"
import { initDialogStyles } from "./init/InitDialogStyles"
import { initOfficeDialogEvents } from "./init/InitOfficeDialogEvents"

Office.onReady().then(() => {
    initDialogStyles()
    initDialogComponents()
    initOfficeDialogEvents()
    initDialog()
})
