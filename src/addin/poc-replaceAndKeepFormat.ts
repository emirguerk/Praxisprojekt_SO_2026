import ApexCharts from "apexcharts"

async function insertChart(base64: string){
    await Word.run(async (context) => {
        const range = context.document.getSelection()

        const pics = range.inlinePictures;

        pics.load("items");
        await context.sync();

        const img = pics.items[0];

        img.load(["width", "height", "altTextTitle", "altTextDescription"])
        await context.sync();
        
        const newImage = range.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace);
        
        newImage.width = img.width
        newImage.height = img.height
        newImage.altTextTitle = img.altTextTitle
        newImage.altTextDescription = img.altTextDescription

        await context.sync();
    })
}

Office.onReady().then(async () => {
    const chart = new ApexCharts(document.querySelector('#chart6') as HTMLElement, {
        chart: { type: 'bar' },
        series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
    })

    chart.render()

    chart.dataURI().then((value: { imgURI: string } | { blob: Blob }) => {
        const imgURI: string = (value as { imgURI: string }).imgURI
        const base64 = imgURI.split(",")[1];
        document.querySelector('#poc6')?.addEventListener('click', () => insertChart(base64))
    })
})
