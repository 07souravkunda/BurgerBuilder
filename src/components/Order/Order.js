import React from 'react';
import Styles from './Order.module.css';

const order=(props) => {
    let ingredients = Object.keys(props.ingredients).map((igKey) => {
        return <span
        style={{boxSizing:'inline-block',
                padding:'5px',
                margin:'0 8px',
                border:'1px solid #ccc'}} key={igKey}>{igKey} ({props.ingredients[igKey]})</span>
    })
    return(
        <div className={Styles.Order}>
            <div>ingredients:{ingredients}</div>
            <p>total-price:<strong>{props.price} rupees</strong></p>

        </div>
    );

}

export default order;