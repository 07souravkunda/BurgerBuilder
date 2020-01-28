import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Styles from './CheckoutSummary.module.css';

const checkoutSummary =(props) => {
    
    return(
    <div className={Styles.CheckoutSummary}>
        <h4>Hope you a nice day with the burger!</h4>
        <Burger ingredients={props.ingredients} style={{width:"100%",alignContent:"center"}}/>
        <Button type="Cancel" clicked={props.clickedCancel}>CANCEL</Button>
        <Button type="Continue" clicked={props.clickedContinue}>CONTINUE</Button>
    </div>
    );
}

export default checkoutSummary;