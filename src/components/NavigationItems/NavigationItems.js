import React from 'react';
import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props =>{ 
    return(
        
                <ul className={Styles.NavigationItems}>
                    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                    {props.isAuth ? <NavigationItem link="/order" >Orders</NavigationItem> : null}
                    {!props.isAuth ? 
                    <NavigationItem link="/authentication">Authentication</NavigationItem>:
                    <NavigationItem link="/logout">Logout</NavigationItem>}
                </ul>
       
    
    
)
};

export default navigationItems;