import React from 'react';
import Styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControl = props => {
    const controls=[
        {label:'Cheese',type:'Cheese'},
        {label:'Salad',type:'Salad'},
        {label:'Bacon',type:'Bacon'},
        {label:'Meat',type:'Meat'}
    ];

return(
    <div className={Styles.BuildControls}>
            <div>current price is <strong> ₹{props.price}</strong></div>
            {controls.map(el => {
                return <BuildControl key={el.label} label={el.label} 
                removed={() => props.removeIngredient(el.type)}
                added={() => props.addIngredient(el.type)}
                isDisabled={props.checkDisabled(el.type)}
                />
            })}
            <button className={Styles.OrderButton} 
            disabled={props.display}
            onClick={props.purchase}>{props.isAuth?'ORDER NOW':'SIGNUP TO CONTINUE'}</button>
    </div>
);
};

export default buildControl;