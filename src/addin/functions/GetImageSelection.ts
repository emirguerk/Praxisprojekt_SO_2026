import { IImageFormatProps } from "../types/IImageFromatProps"

export async function getTagFromImageSelection(): Promise<string | null> {
    try{
        return await Word.run(async (context) => {
            const range = context.document.getSelection()

            const contentControls = range.getContentControls()
            contentControls.load('items/tag')

            await context.sync()
            
            return contentControls.items[0].tag
        })
    } catch(error){
        return null
    }
}

export async function getImageFormatPropertiesFromImageSelection(): Promise<IImageFormatProps> {
    return await Word.run(async (context) => {
        const contentControls = context.document.getSelection().getContentControls()

        contentControls.load("images")
        await context.sync()

        const contentControl = contentControls.items[0]
        const images = contentControl.inlinePictures

        images.load("items")
        await context.sync()

        const img = images.items[0]

        img.load(["width", "height", "altTextTitle", "altTextDescription"])
        await context.sync()

        return {
            width: img.width,
            height: img.height,
            altTextTitle: img.altTextTitle,
            altTextDescription: img.altTextDescription
        } as IImageFormatProps
    })
}