export async function getTagFromImageSelection(): Promise<string> {
    return await Word.run(async (context) => {
        const range = context.document.getSelection()

        const contentControls = range.getContentControls()
        contentControls.load('items/tag')

        await context.sync()
        
        return contentControls.items[0].tag
    })
}