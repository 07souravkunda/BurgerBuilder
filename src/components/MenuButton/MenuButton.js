import React from 'react';
import Styles from './MenuButton.module.css';

const menuButton = (props) => {
    return(
         <div className={Styles.MenuButton} onClick={props.clicked}>
             <div></div>
             <div></div>
             <div></div>
         </div>
    );
}
export default menuButton;