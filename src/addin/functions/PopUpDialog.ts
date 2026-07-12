import { PopUpOption } from "../enums/PopUpOption";
import { IPopUp } from "../types/IPopUp";

export function showPopUpDialog(popUpOption: PopUpOption) {
    const popUp = document.querySelector('custom-pop-up') as IPopUp
    const pElement = popUp.querySelector('p') as HTMLElement    

    popUp.style.setProperty('display', 'flex')

    if(popUpOption === PopUpOption.SUCCESS){
        pElement.classList.add('success')
        pElement.textContent = "Your chart has been inserted successfully."
    } else if (popUpOption === PopUpOption.ERROR){
        pElement.classList.add('error')
        pElement.textContent = "The chart could not be inserted. To update an existing chart, please select it in the document first."
    } else {
        pElement.classList.add('warn')
        pElement.textContent = "Please sync the document before continuing to make sure all charts are up to date."
    }

    setTimeout(() => {
        popUp.style.setProperty('display', 'none')
        pElement.classList.remove('success')
        pElement.classList.remove('error')
        pElement.classList.remove('warn')
        pElement.textContent = ""
    }, 5000)
}