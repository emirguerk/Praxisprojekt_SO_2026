import { decode } from "js-base64";
import { ChartInstance } from "../classes/Chart";
import { XmlPartID } from "../enums/XmlPartID";
import { IImageData } from "../types/IImageData";

export async function getCustomXmlPart(context: Word.RequestContext, items: Word.CustomXmlPart[]): Promise<Word.CustomXmlPart> {
    for (const item of items) {
        const xmlResult = item.getXml();

        await context.sync();

        if (xmlResult.value.includes(XmlPartID.VALUE)) {  
            return item
        }
    }

    throw(`Not Found CustomXmLPart ${XmlPartID.VALUE}`)
}

export async function getCustomXmlPartContent() :Promise<string[]> {
    return await Word.run(async (context) => {
        const parser = new DOMParser()
        const customXmlParts = context.document.customXmlParts;
        customXmlParts.load('items')

        await context.sync();

        const customXmlPartItem = await getCustomXmlPart(context, customXmlParts.items)
        const xmlResult = customXmlPartItem.getXml()

        await context.sync();

        const xml = parser.parseFromString(xmlResult.value, "text/xml")
        const content = xml.documentElement.textContent
        const listOfImageData = JSON.parse(content) as string[]
        return listOfImageData
    })
}

export async function createCustomXmlPart(context: Word.RequestContext, customXmlParts: Word.CustomXmlPartCollection){
    const hasAlreadyCustomXmlPartCreated = await hasAlreadyCustomXmlPart(context, customXmlParts.items)
    
    if(hasAlreadyCustomXmlPartCreated)
        return

    customXmlParts.add(`<${XmlPartID.VALUE}>${JSON.stringify([])}</${XmlPartID.VALUE}>`)
}

export async function saveNewCustomXmlPart(context: Word.RequestContext, item: Word.CustomXmlPart, newImageData: string) {
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

export async function safeNewExistingCustomXmlPart(context: Word.RequestContext, item: Word.CustomXmlPart, newImageData: string){
    const parser = new DOMParser()
    const xmlResult = item.getXml();

    await context.sync();

    const xml = parser.parseFromString(xmlResult.value, "text/xml")
    const content = xml.documentElement.textContent
    const chartId = ChartInstance.getChartId()
    const listOfImageData = JSON.parse(content) as string[]

    const updatedList = listOfImageData.map((imageData) => {
        const data = JSON.parse(decode(imageData)) as IImageData

        if(data.id === chartId) {
            return newImageData
        } else {
            return imageData
        }
    })
    
    item.setXml(`<${XmlPartID.VALUE}>${JSON.stringify(updatedList)}</${XmlPartID.VALUE}>`)
    await context.sync();
}

export async function hasAlreadyCustomXmlPart(context: Word.RequestContext,items: Word.CustomXmlPart[]): Promise<boolean> {
    for (const item of items) {
        const xmlResult = item.getXml();

        await context.sync();

        if (xmlResult.value.includes(XmlPartID.VALUE)) {
            return true;
        }
    }

    return false;
}