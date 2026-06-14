import ApexCharts from "apexcharts"

async function testConentControlPart() {
    await Word.run(async (context) => {
        const range = context.document.getSelection()

        const controls = range.contentControls
        controls.load("items")

        await context.sync()

        const cc = controls.items[0]
        range.insertText("content-tag: " + cc.tag, Word.InsertLocation.after)
        
        await context.sync();
    })
}

async function insertChart(base64: string){
    await Word.run(async (context) => {
        const range = context.document.getSelection()
        
        const image = range.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace);

        const cc = image.insertContentControl()
        cc.tag = "myChart"

        image.select()

        await context.sync();

        await testConentControlPart()
    })
}

Office.onReady().then(async () => {
    const chart = new ApexCharts(document.querySelector('#chart4') as HTMLElement, {
        chart: { type: 'bar' },
        series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
    })

    chart.render()

    chart.dataURI().then((value: { imgURI: string } | { blob: Blob }) => {
        const imgURI: string = (value as { imgURI: string }).imgURI
        const base64 = imgURI.split(",")[1];
        document.querySelector('#poc4')?.addEventListener('click', () => insertChart(base64))
    })


})

