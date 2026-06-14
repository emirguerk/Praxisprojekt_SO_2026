import ApexCharts from "apexcharts"

async function insertChart(base64: string){
    await Word.run(async (context) => {
        const range = context.document.getSelection()
        
        range.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace);

        await context.sync();
    })
}

Office.onReady().then(() => {
    const chart = new ApexCharts(document.querySelector('#chart2') as HTMLElement, {
        chart: { type: 'donut' },
        series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        labels: ["1991","1992","1993","1994","1995","1996","1997","1998","1999"] 
    })

    chart.render()

    chart.dataURI().then((value: { imgURI: string } | { blob: Blob }) => {
        const imgURI: string = (value as { imgURI: string }).imgURI
        const base64 = imgURI.split(",")[1];
        document.querySelector('#poc2')?.addEventListener('click', () => insertChart(base64))
    })
})

