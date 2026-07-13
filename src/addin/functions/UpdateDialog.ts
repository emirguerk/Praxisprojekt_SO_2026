import { ChartInstance } from "../classes/Chart"
import { IImageFormatProps } from "../types/IImageFromatProps"
import { IMessageDialog } from "../types/IMessageDialog"
import { getCustomXmlPart, safeNewExistingCustomXmlPart } from "./CustomXmlPart"
import { getImageFormatPropertiesFromImageSelection } from "./GetImageSelection"
import { getMessageDialogAnswer } from "./MessageDialog"

let timeoutId: ReturnType<typeof setTimeout>;

export function updateDialog(){
    timeoutId = setTimeout(async () => {
        const result = await updateImage()

        Office.context.ui.messageParent(JSON.stringify({ success: result }))
    }, 5000)
}

export function cancleUpdate(){
    clearTimeout(timeoutId)
}

async function updateImage() : Promise<boolean> {
    return new Promise(async (resolve) => {
        try{
            const { updateDialog } = getUpdateMessageDialogElements()
            updateDialog.classList.add('is-visible')

            await getMessageDialogAnswer().then( async (answer) => {
                if(answer){
                    const format = await getImageFormatPropertiesFromImageSelection() as IImageFormatProps
                    await replaceImage(answer, format)
                } else {
                    await replaceImage(answer)
                }
            })
        } catch(error){
            resolve(false)
        }

        resolve(true)
    })
}

async function updateCustomXmlPart(context: Word.RequestContext){
    const customXmlParts = context.document.customXmlParts;
    customXmlParts.load('items')

    await context.sync();
    
    const imageDataAsBase64 = ChartInstance.getImageDataAsBase64()
    const customXmlPart = await getCustomXmlPart(context, customXmlParts.items)
    
    await safeNewExistingCustomXmlPart(context, customXmlPart, imageDataAsBase64)
}

async function replaceImage(keepFormat: boolean, format?: IImageFormatProps){
    await Word.run(async (context) => {
        const selection = context.document.getSelection()

        const contentControls = selection.getContentControls()
        contentControls.load("items")

        await context.sync()

        const contentControl = contentControls.items[0]

        const base64 = await ChartInstance.getImageAsBase64()

        if (!base64) throw Error('Could not generate image as base64')

        const updatedImage = contentControl.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace)

        contentControl.tag = ChartInstance.getChartId()

        await context.sync();

        if(keepFormat){
            updatedImage.width = format!!.width
            updatedImage.height = format!!.height
            updatedImage.altTextTitle = format!!.altTextTitle
            updatedImage.altTextDescription = format!!.altTextDescription
        }

        await updateCustomXmlPart(context)
    })
}

function getUpdateMessageDialogElements(){
    const updateDialog = document.querySelector('message-dialog') as IMessageDialog

    return{
        updateDialog
    }
}

