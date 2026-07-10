import { ChartInstance } from "../classes/Chart"
import { XmlPartID } from "../enums/XmlPartID";

export async function insertDialog(){
    const result = await insert()

    Office.context.ui.messageParent(JSON.stringify({ success: result }))
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
    const contentControl = image.insertContentControl()
    contentControl.tag = ChartInstance.getChartId()
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

async function createCustomXmlPart(context: Word.RequestContext, customXmlParts: Word.CustomXmlPartCollection){
    const hasAlreadyCustomXmlPartCreated = await hasAlreadyCustomXmlPart(context, customXmlParts.items)
    
    if(hasAlreadyCustomXmlPartCreated)
        return

    customXmlParts.add(`<${XmlPartID.VALUE}>${JSON.stringify([])}</${XmlPartID.VALUE}>`)
}

async function saveNewCustomXmlPart(context: Word.RequestContext, item: Word.CustomXmlPart, newImageData: string) {
    const parser = new DOMParser()
    const xmlResult = item.getXml();

    await context.sync();

    const xml = parser.parseFromString(xmlResult.value, "text/xml")
    const content = xml.documentElement.textContent
    const listOfImageData = JSON.parse(content) as string[]
    listOfImageData.push(newImageData)

    item.setXml(`<${XmlPartID.VALUE}>${JSON.stringify(listOfImageData)}</${XmlPartID.VALUE}>`)
    await context.sync();
}

async function getCustomXmlPart(context: Word.RequestContext,items: Word.CustomXmlPart[]): Promise<Word.CustomXmlPart> {
    for (const item of items) {
        const xmlResult = item.getXml();

        await context.sync();

        if (xmlResult.value.includes(XmlPartID.VALUE)) {  
            return item
        }
    }

    throw(`Not Found CustomXmLPart ${XmlPartID.VALUE}`)
}

async function hasAlreadyCustomXmlPart(context: Word.RequestContext,items: Word.CustomXmlPart[]): Promise<boolean> {
    for (const item of items) {
        const xmlResult = item.getXml();

        await context.sync();

        if (xmlResult.value.includes(XmlPartID.VALUE)) {
            return true;
        }
    }

    return false;
}