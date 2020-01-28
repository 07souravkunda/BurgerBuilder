import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component{
    componentDidMount(){
        this.props.logoutHandler();
    }
    render(){
        return(
            <Redirect to="/" />
        );
    }
}

const matchDispatchToProps = dispatch => {
    return{
        logoutHandler : () => dispatch(actions.authLogout())
    }
}

export default connect(null,matchDispatchToProps)(Logout);