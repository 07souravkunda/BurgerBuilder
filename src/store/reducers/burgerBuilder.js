import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredient:null,
    totalPrice:30,
    error:false,
    building:false
}

const price={
    Cheese:40,
    Meat:80,
    Salad:30,
    Bacon:50
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.LOAD_INGREDIENT_SUCCESSFUL:
            return{
                ...state,
                ingredient:action.ingredients,
                totalPrice:30,
                building:false
            }
        case actionTypes.LOAD_INGREDIENT_FAIL:
            return{
                ...state,
                error:true,
                building:false
            }
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] + 1 
                },
                totalPrice:state.totalPrice + price[action.ingredientName],
                building:true
            }
        case actionTypes.REMOVE_INGREDIENT :
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] - 1 
                },
                totalPrice:state.totalPrice - price[action.ingredientName],
                building:true
            }
            default:
                return state
    }
}

export default reducer;