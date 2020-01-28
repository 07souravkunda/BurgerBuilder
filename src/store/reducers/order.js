import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    loading:false,
    purchased:false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.PLACE_ORDER_INIT:
            return{
                ...state,
                purchased:false
            }
        case actionTypes.PLACE_ORDER_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.PLACE_ORDER_SUCCESSFUL:
            const newOrder = {
                ...action.order,
                id:action.orderId
            }
            return {
                ...state,
                orders:state.orders.concat(newOrder),
                loading:false,
                purchased:true
            }
        default:
            return state
    }
}

export default reducer;