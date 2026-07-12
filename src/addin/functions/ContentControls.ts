import { ChartInstance } from "../classes/Chart"

export function insertContentControls(image: Word.InlinePicture){
    const contentControl = image.insertContentControl()
    contentControl.tag = ChartInstance.getChartId()
    contentControl.appearance = Word.ContentControlAppearance.hidden;
}