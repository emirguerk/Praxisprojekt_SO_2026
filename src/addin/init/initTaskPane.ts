import '../components/PopUpMessageComponent'

export function initTaskPane(){
    const root = document.querySelector('#root')
    if(root)
        root.innerHTML = `
            <main>

                <ul>
                    <li><button id="new-chart-dialog-button" class="button primary-button" type="button">Create new chart</button></li>
                    <li><button id="update-chart-dialog-button" class="button primary-button">Update existing chart</button></li>
                    <li><button id="sync-document-button" class="button primary-button">Sync document</button></li>
                </ul>

            </main>
            <footer>
                <custom-pop-up></custom-pop-up>
            </footer>
        `
}