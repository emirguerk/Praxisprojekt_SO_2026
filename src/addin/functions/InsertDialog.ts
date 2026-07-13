import { ChartInstance } from "../classes/Chart"
import { insertContentControls } from "./ContentControls";
import { createCustomXmlPart, getCustomXmlPart, saveNewCustomXmlPart } from "./CustomXmlPart";

let timeoutId: ReturnType<typeof setTimeout>;

export function insertDialog(){
    timeoutId = setTimeout(async () => {
        const result = await insert()

         Office.context.ui.messageParent(JSON.stringify({ success: result }))
    }, 5000)
}

export function cancleInsert(){
    clearTimeout(timeoutId)
}

async function insert(): Promise<boolean>{
    try{
        const base64 = await ChartInstance.getImageAsBase64();

        if (!base64) return false;

        await Word.run(async (context) => {
            const image = context.document.body.insertInlinePictureFromBase64(
                base64,
                Word.InsertLocation.end
            )

            addContentControls(image)

            await addCustomXmlPart(context)
        })
    } catch(e) {
        console.error(e)
        return false
    }

    return true;
}

function addContentControls(image: Word.InlinePicture){
    insertContentControls(image)
}

async function addCustomXmlPart(context: Word.RequestContext){
    const customXmlParts = context.document.customXmlParts;
    customXmlParts.load('items')

    await context.sync();
    
    await createCustomXmlPart(context, customXmlParts)

    const imageDataAsBase64 = ChartInstance.getImageDataAsBase64()
    const customXmlPart = await getCustomXmlPart(context, customXmlParts.items)
    
    await saveNewCustomXmlPart(context, customXmlPart, imageDataAsBase64)
}
