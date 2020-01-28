import React from 'react';
import Styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const burgerIngredient = props => {
    let ingredient=null;
    switch(props.type){
        case 'BreadBottom':ingredient=<div className={Styles.BreadBottom}></div>;
        break;
        case 'BreadTop' :ingredient=<div className={Styles.BreadTop}></div>;
        break;
        case 'Cheese' :ingredient=<div className={Styles.Cheese}></div>;
        break;
        case 'Meat' :ingredient=<div className={Styles.Meat}></div>;
        break;
        case 'Seeds1' :ingredient=<div className={Styles.Seeds1}></div>;
        break;
        case 'Seeds2' :ingredient=<div className={Styles.Seeds2}></div>;
        break;
        case 'Salad' :ingredient=<div className={Styles.Salad}></div>;
        break;
        case 'Bacon' :ingredient=<div className={Styles.Bacon}></div>;
        break;
        default:ingredient=null;
    }
    return ingredient;
};
burgerIngredient.propTypes = {
    type:PropTypes.string.isRequired
}
export default burgerIngredient;