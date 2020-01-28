import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const loadIngredientSuccessful = (ingredients) => {
    return {
        type:actionTypes.LOAD_INGREDIENT_SUCCESSFUL,
        ingredients:ingredients
    }
}

export const loadIngredientFail = () => {
    return {
        type:actionTypes.LOAD_INGREDIENT_FAIL
    }
}

export const loadIngredient = (ingredients) => {
    return dispatch => {
        axios.get('https://burgerapp-86de2.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(loadIngredientSuccessful(response.data));
        }).catch(err => {
           dispatch( loadIngredientFail())
        });
    }
}
