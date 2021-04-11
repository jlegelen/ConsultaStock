
const mainReducer = (state, action) => {

    return { 
        ...state,
        ...action.payload
    }

}
  
export default mainReducer