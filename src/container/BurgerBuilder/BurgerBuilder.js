import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorMessage from '../../hoc/withErrorMessage/withErrorMessage';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component{

   
    state={
        purchasing:false,
        purchaseLoader:false
    };
    componentWillMount=() => {
        this.props.onLoadIngredient();
     };
    checkDisabled=(type) => {
            return this.props.ings[type] <= 0  
    };
    displayOrderButtonHandler=(ingredient) => {
        const ingredientQuantity = Object.keys(ingredient).map(igKey => {
            return ingredient[igKey];
        });
        const sum = ingredientQuantity.reduce((acc,el) => {
            return  acc+el;
        },0);
        
        
        return sum<=0
        
    }
    purchasingHandler = () => {
        if(this.props.isAuth){
            this.setState({
                purchasing:true
            });
        }
        else{
            this.props.onAuthRedirectPath('/checkout');
            this.props.history.push('/authentication');
        }
       
    }
    cancelPurchasingHandler=() => {
        this.setState({
            purchasing:false
        });
    }
    continuePurchaseHandler=() => {
        this.props.history.push({pathname:'/checkout'});
    }
    render(){
        let orderSummary= null;
        let burger=this.props.error?<p>ingredients can't be uploaded</p>:<Spinner/>;
        if(this.props.ings){
            burger=(
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                addIngredient={this.props.onAddIngredient}
                removeIngredient={this.props.onRemoveIngredient}
                checkDisabled = {this.checkDisabled}
                display={this.displayOrderButtonHandler(this.props.ings)}
                price={this.props.price}
                purchase={this.purchasingHandler}
                isAuth={this.props.isAuth}
                />
            </Aux>
            );
           
            orderSummary=<OrderSummary 
            ingredient={this.props.ings} 
            price={this.props.price}
            purchaseCancel={this.cancelPurchasingHandler}
            purchaseContinue={this.continuePurchaseHandler}
            />
        }
        if(this.state.purchaseLoader){
            orderSummary=<Spinner/>
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const matchStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token !== null
    }
}

const matchDispatchToProps = dispatch => {
    return {
        onAddIngredient:(ingredient) => dispatch(actions.addIngredient(ingredient)),
        onRemoveIngredient:(ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onLoadIngredient:() => dispatch(actions.loadIngredient()),
        onAuthRedirectPath:(path) => dispatch(actions.authRedirectPath(path))

    }
}

export default connect(matchStateToProps,matchDispatchToProps)(withErrorMessage(BurgerBuilder,axios));