import React from 'react';
import Styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let transformedIngredients;
    transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add the ingredients!</p>
    }
    return (
        <div className={Styles.Burger}>
            <BurgerIngredient type='BreadTop' />
            {transformedIngredients}
            <BurgerIngredient type='BreadBottom'/>
        </div>
    );
}
export default burger;