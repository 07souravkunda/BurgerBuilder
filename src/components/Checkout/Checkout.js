import React,{Component} from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import Styles from './Checkout.module.css';
import ContactData from '../ContactData/ContactData';
import {withRouter,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component{

    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        this.props.history.push(this.props.match.url+'/contact-data');
        this.props.onPlaceOrderInit();
    }
    render(){
        let render = <Redirect to="/" />;
        if(this.props.ings){
            render=(<div className={Styles.Checkout}>
                <CheckoutSummary ingredients={this.props.ings} 
                clickedCancel={this.cancelHandler}
                clickedContinue={this.continueHandler}
                />
                <Route path={this.props.match.url+"/contact-data"} component={ContactData}/>
            </div>);
        }
        return(
            <div>
                {render}
            </div>
        );
    }
}
const matchStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredient
    }
}
const matchDispatchToProps = dispatch => {
    return {
        onPlaceOrderInit : () => dispatch(actions.placeOrderInit())
    }
}
export default connect(matchStateToProps,matchDispatchToProps)(withRouter(Checkout));