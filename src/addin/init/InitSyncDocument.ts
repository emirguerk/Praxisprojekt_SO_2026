import { decode } from "js-base64"
import { getCustomXmlPart } from "../functions/CustomXmlPart"
import { IImageData } from "../types/IImageData"
import { XmlPartID } from "../enums/XmlPartID"
import { PopUpOption } from "../enums/PopUpOption"
import { showPopUpDialog } from "../functions/PopUpDialog"

export function initSyncDocument(){    
    const newChartDialogButton = document.querySelector('#sync-document-button')
    newChartDialogButton?.addEventListener('click', async () => {      
        try{
            await Word.run(async (context) => {
                await deleteEmptyContentControls(context);
            })

            await Word.run(async (context) => {
                await syncCustomXml(context);
            })
        } finally {
            showPopUpDialog(PopUpOption.SYNC)
        }
    })
}

async function deleteEmptyContentControls(context: Word.RequestContext): Promise<void> {
    const contentControls = context.document.contentControls;

    contentControls.load("items");
    await context.sync();

    for (const contentControl of contentControls.items) {
        contentControl.inlinePictures.load("items");
    }

    await context.sync();

    for (const contentControl of contentControls.items) {
        if (contentControl.inlinePictures.items.length === 0) {
            contentControl.delete(false);
        }
    }

    await context.sync();
}

async function syncCustomXml(context: Word.RequestContext) {
    const parser = new DOMParser();

    const contentControls = context.document.contentControls;
    contentControls.load("items/tag");

    const customXmlParts = context.document.customXmlParts;
    customXmlParts.load("items");

    await context.sync();


    const customXmlPart = await getCustomXmlPart(
        context,
        customXmlParts.items
    );

    const xmlResult = customXmlPart.getXml();

    await context.sync();


    const xml = parser.parseFromString(
        xmlResult.value,
        "text/xml"
    );

    const listOfImageData = JSON.parse(
        xml.documentElement.textContent ?? "[]"
    ) as string[];


    const syncedList = listOfImageData.filter(imageData => {
        const data = JSON.parse(decode(imageData)) as IImageData;

        return contentControls.items.some(
            cc => cc.tag === data.id
        );
    });


    customXmlPart.setXml(
        `<${XmlPartID.VALUE}>${JSON.stringify(syncedList)}</${XmlPartID.VALUE}>`
    );

    await context.sync();
}