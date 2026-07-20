import { ChartInstance } from "../classes/Chart"

export async function insertContentControls(image: Word.InlinePicture){
    const contentControl = image.insertContentControl()
    contentControl.tag = ChartInstance.getChartId()
    contentControl.appearance = Word.ContentControlAppearance.hidden;
}

export async function hasEmptyContentControls(): Promise<boolean> {
    return new Promise(async (resolve) => {
        await Word.run(async (context) => {
            const contentControls = context.document.contentControls;

            contentControls.load("items")
            await context.sync()

            for (const contentControl of contentControls.items) {
                contentControl.inlinePictures.load("items")
            }

            await context.sync()

            for (const contentControl of contentControls.items) {
                if (contentControl.inlinePictures.items.length === 0) {
                    resolve(true)
                }
            }

            resolve(false)
        })
    })
}