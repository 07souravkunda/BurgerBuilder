import React from 'react';
import Styles from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    return(
        <header className={Styles.Toolbar}>
            {props.children}
            <nav className={Styles.Navig}>
                   <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
}

export default toolbar;