import React from 'react';
import Logo from '../Toolbar/logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './Sidedrawer.module.css';
import Aux from '../../hoc/Auxilary';
import Backdrop from '../UI/Backdrop/Backdrop';

const sidedrawer =props => {
    let classes=[Styles.Sidedrawer,Styles.Close];
    if(props.show){
        classes=[Styles.Sidedrawer,Styles.Open];
    }   

    return (
        <Aux>
            <Backdrop show={props.show} cancelPurchase={props.sidedrawer}/>
            <div className={classes.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sidedrawer;