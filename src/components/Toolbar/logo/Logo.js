import React from 'react';
import imgPath from '../../../assets/image/burger-logo.png';
import Styles from './Logo.module.css'

const logo = (props) => {
    return(
        <div className={Styles.Logo} style={{
            height:props.height,
            alignItems:"center"
        }}>
            <img src={imgPath} alt="BurgerImage"></img>
        </div>
    );   
}
export default logo;