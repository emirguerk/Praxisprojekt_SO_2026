import "../components/StatusBarComponent"
import "../components/HeaderCommandBarComponent"
import "../components/TableComponent"
import "../components/FooterNavigationCommandBarComponent"
import "../components/ChartComponent"
import "../components/MessageDialogComponent"

import { tableDialog } from "../functions/TabelDialog"
import { headerCommandBarDialog } from "../functions/HeaderCommandBarDialog"

export function initDialogComponents(){
    headerCommandBarDialog()
    tableDialog()
}