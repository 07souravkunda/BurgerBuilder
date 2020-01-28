import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary'
import Styles from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';
import Logo from '../Toolbar/logo/Logo';

import Sidedrawer from '../Sidedrawer/Sidedrawer';
import MenuButton from '../MenuButton/MenuButton';
import {connect} from 'react-redux';

class Layout extends Component {
    state={
        showSidedrawer:false
    };
    sidedrawerToggleHandler = (prevState) => {
        this.setState({
            showSidedrawer:!prevState.showSidedrawer
        });
    }
    sidedrawerHandler=() => {
        this.setState(
            {showSidedrawer:false}
        );
    }

    render(){
        return(
            <Aux>
            <Toolbar isAuth={this.props.isAuth} >
                <MenuButton clicked={()=>this.sidedrawerToggleHandler(this.state)}/>
                <Logo/>
               
            </Toolbar>
            <Sidedrawer show={this.state.showSidedrawer} isAuth={this.props.isAuth} sidedrawer={this.sidedrawerHandler}/>
            <main className={Styles.Content}>
                {this.props.children}
            </main>
        </Aux>
        );  
    }
};

const matchStateToProps = state => {
    return {
        isAuth:state.auth.token !== null
    }
}

export default connect(matchStateToProps)(Layout);