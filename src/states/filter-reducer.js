const initState = {
    cond: '',
    name: '',
}

export function filter(state=initState, action)
{
    switch(action.type){
        case '@FILTER/SET':
            return{
                ...state,
                cond: action.cond,
                name: action.name,
            }
        case '@FILTER/UNSET':
            return{
                ...state,
                cond: '',
                name: '',
            }
        default:
            return{
                ...state,
            }
    }
}