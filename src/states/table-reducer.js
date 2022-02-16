const initState = {
  header: [],
  data: []
}

export function table(state=initState, action)
{
  switch(action.type){
    case '@TABLE/SET':
      return{
        ...state,
        header: action.header,
        data: action.data
      }
    case '@TABLE/UNSET':
      return{
        ...state,
        header: [],
        data: []
      }
    default:
      return{
        ...state
      }
  }
}