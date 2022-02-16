const initState = {
    chosenOptions: {},
}

export function option(state=initState, action)
{
    switch(action.type){
        case '@OPTION/SET':
            return{
                ...state,
                chosenOptions: action.chosenOptions,
            }
        case '@OPTION/UNSET':
            return{
                ...state,
                chosenOptions: {},
            }
        default:
            return{
                ...state,
            }
    }
}