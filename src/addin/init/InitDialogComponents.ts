import "../components/StatusBarComponent"
import "../components/HeaderCommandBarComponent"
import "../components/TableComponent"
import "../components/FooterNavigationCommandBarComponent"
import "../components/ChartComponent"

import { dropdownDialog } from "../functions/DropdownDialog"
import { tableDialog } from "../functions/TabelDialog"

export function initDialogComponents(){
    dropdownDialog()
    tableDialog()
}