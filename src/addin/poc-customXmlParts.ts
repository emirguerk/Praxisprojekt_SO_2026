import ApexCharts from "apexcharts"

async function testCustomXmlPart() {
    await Word.run(async (context) => {
        const range = context.document.getSelection()

        const controls = range.contentControls
        controls.load("items")

        await context.sync()

        const cc = controls.items[0]
        const customXmlPartId = cc.tag.split(';')[1]

        const parts = context.document.customXmlParts;
        const part = parts.getItemOrNullObject(`{${customXmlPartId}}`);

        const xml = part.getXml();

        await context.sync();

        console.log(xml.value);
        range.insertText("xmlPart: " + xml.value, Word.InsertLocation.after)
    })
}

async function insertChart(base64: string){
    await Word.run(async (context) => {
        const range = context.document.getSelection()
        
        const image = range.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace);

        const cc = image.insertContentControl()
        cc.tag = "myChart"

        await context.sync();
        
        const xml = `<data>[30,40,50]</data>`

        const part = context.document.customXmlParts.add(xml);

        part.load("id");

        await context.sync();

        cc.tag = `${cc.tag};${part.id.replace(/[{}]/g, "")}`

        image.select();

        await context.sync();

        await testCustomXmlPart();
    })
}

Office.onReady().then(async () => {
    const chart = new ApexCharts(document.querySelector('#chart5') as HTMLElement, {
        chart: { type: 'donut' },
        series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        labels: ["1991","1992","1993","1994","1995","1996","1997","1998","1999"]
    })

    chart.render()

    chart.dataURI().then((value: { imgURI: string } | { blob: Blob }) => {
        const imgURI: string = (value as { imgURI: string }).imgURI
        const base64 = imgURI.split(",")[1];
        document.querySelector('#poc5')?.addEventListener('click', () => insertChart(base64))
    })


})
