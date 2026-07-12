import { ApexOptions } from "apexcharts";
import { ChartInstance } from "../classes/Chart";
import { UseCaseInstance } from "../classes/UseCase";
import { UseCaseOption } from "../enums/UseCase";
import { getCustomXmlPartContent } from "../functions/CustomXmlPart";
import { getTagFromImageSelection } from "../functions/GetImageSelection";

export function initOfficeDialogEvents(){
    officeDialogParentMessageReceived()
    UseCaseInstance.init()
}

function officeDialogParentMessageReceived(){
    Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived,
        async (args) => {
            const message = JSON.parse(args.message)
            const initUseCase = message.initUseCase as UseCaseOption

            UseCaseInstance.setUseCase(initUseCase)
    
            if(initUseCase === UseCaseOption.UPDATE_CHART){
                await getTagFromImageSelection().then((chartId) => {
                    if(chartId){
                            getCustomXmlPartContent().then((listOfImageData) => {
                                ChartInstance.initChartData(chartId, listOfImageData)
                        })
                    } else {
                        Office.context.ui.messageParent(JSON.stringify({ success: false }))
                    }
                })
            }
        }
    )
}

export function initUseCaseFromParent(){
    Office.context.ui.messageParent(JSON.stringify({ initUseCase: true }))
}
