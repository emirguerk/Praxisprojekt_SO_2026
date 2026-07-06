import { ChartInstance } from "../classes/Chart"

export async function insertDialog(){
    const result = await insert()

    Office.context.ui.messageParent(JSON.stringify({ success: result }))
}

async function insert(): Promise<boolean>{
    const base64 = await ChartInstance.getImageAsBase64();

    if (!base64) return false;

    await Word.run(async (context) => {
        context.document.body.insertInlinePictureFromBase64(
            base64,
            Word.InsertLocation.end
        );

        await context.sync();
    });

    return true;
}