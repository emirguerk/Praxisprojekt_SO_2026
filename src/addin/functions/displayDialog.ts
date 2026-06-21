export function dispalyDialog() {
    Office.context.ui.displayDialogAsync('https://localhost:3000/dialog.html', 
        { height: 80, width: 80, displayInIframe: true },
            (asyncResult) => {
                const dialog = asyncResult.value

                // dialog.messageChild(JSON.stringify({ testData: 'hello-child' }))
            }
        )
}