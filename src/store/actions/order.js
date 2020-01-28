import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const placdOrderSuccessful = (id,order) => {
    return {
        type:actionTypes.PLACE_ORDER_SUCCESSFUL,
        order:order,
        orderId:id
    }
}

export const placerOrderFail = (error) => {
    return {
        type:actionTypes.PLACE_ORDER_FAIL,
        error:error
    }
}

export const placeOrderStart = () => {
    return {
        type:actionTypes.PLACE_ORDER_START
    }
}

export const placeOrderInit = () => {
    return {
        type:actionTypes.PLACE_ORDER_INIT
    }
}

export const placeOrder = (order,token) => {
    return dispatch => {
        dispatch(placeOrderStart());
        axios.post('/orders.json?auth='+ token ,order)
        .then((response) => {
            dispatch(placdOrderSuccessful(response.data,order));
           })
        .catch(error => {
            dispatch(placerOrderFail(error));
        })
    }
}