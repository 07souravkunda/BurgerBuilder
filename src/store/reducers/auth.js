import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESSFUL:
           return {
                ...state,
                loading:false,
                userId:action.userId,
                token:action.idToken
            }
            case actionTypes.AUTH_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.err.data.error
                }
            case actionTypes.AUTH_LOGOUT:
                return {
                    ...state,
                    token:null,
                    error:null,
                    userId:null
                }
            case actionTypes.AUTH_REDIRECT_PATH:
                return{
                    ...state,
                    authRedirectPath:action.path
                }
        default:
            return state;
    }
}

export default reducer;