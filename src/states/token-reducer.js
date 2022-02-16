const initState = {
  token: ''
}

export function token(state=initState, action)
{
  switch(action.type){
    case '@TOKEN/SET':
      return{
        ...state,
        token: action.target,
      }
    case '@TOKEN/UNSET':
      return{
        ...state,
        token: ''
      }
    default:
      return{
        ...state
      }
  }
}