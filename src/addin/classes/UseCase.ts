import { UseCaseOption } from "../enums/UseCase"
import { initUseCaseFromParent } from "../init/InitOfficeDialogEvents"

class UseCase{
    private _useCase: UseCaseOption

    constructor(){
        this._useCase = UseCaseOption.NOT_INIT
    }

    public init(){
        initUseCaseFromParent()
    }

    public setUseCase(useCase: UseCaseOption){
        this._useCase = useCase
    }

    public getUseCase(){
        return this._useCase
    }


}

export const UseCaseInstance = new UseCase()