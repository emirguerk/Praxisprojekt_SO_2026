import { initTaskPane } from "./init/InitTaskPane"
import { initCreateChartDialog } from "./init/InitCreateChartDialog"
import { initTaskPaneStyles } from "./init/InitTaskPaneStyles"
import { initUpdateChartDialog } from "./init/InitUpdateChartDialog"
import { initSyncDocument } from "./init/InitSyncDocument"

Office.onReady().then(() => {
    initTaskPaneStyles()
    initTaskPane()
    initCreateChartDialog()
    initUpdateChartDialog()
    initSyncDocument()
})