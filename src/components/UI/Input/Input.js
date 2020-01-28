import React from 'react';
import Styles from './Input.module.css';

const input = props => {
    let inputElement = null;
    const styles = [];
    styles.push(Styles.InputElement);
    if(props.isNotValid && props.isTouched){
        styles.push(Styles.Invalid);
    }
    switch(props.elementType){
        case('input'):
        inputElement = <input className={styles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />;
        break;
        case('textarea'):
        inputElement = <textarea className={styles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />;
        break;
        case('select'):
        inputElement=
            <select 
            value={props.value}
            onChange={props.changed}>
                {props.elementConfig.options.map(el=>(
                    <option key={el.value} value={el.value}>{el.displayValue}</option>
                ))}
            </select >
        ;
        break;
        default :
        inputElement = <input className={styles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />;
    }

    return (
        <div className={Styles.Input}>
            <label className={Styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;