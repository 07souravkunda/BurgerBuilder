import React from 'react';
import Styles from './OrderSummary.module.css';
import Button from '../Button/Button';
import Aux from '../../../hoc/Auxilary';

const orderSummary = props => {
    const orderedItems = Object.keys(props.ingredient).map(igKey=>{
        return <li key={igKey}>{igKey} : <strong>{props.ingredient[igKey]}</strong></li>;
    });
    
    return(
        <Aux>
            <div className={Styles.OrderSummary}>
                <p>Your oredered burger contains</p>
                <ul>
                    {orderedItems}
                </ul>
                <p>payable amount is <span style={{fontSize:"20px",color:"brown",textEmphasis:"bolder"}}>{props.price}</span> rupees</p>

                <p>do you want to <strong>continue?</strong></p>
            </div>
            
                <Button type="Cancel" clicked={props.purchaseCancel}>Cancel</Button>
                <Button type="Continue" clicked={props.purchaseContinue}>Continue</Button>
            
        </Aux>
    );
}

export default orderSummary;