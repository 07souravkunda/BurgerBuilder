import React,{Component} from 'react';
import Aux from './hoc/Auxilary';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import {Route,Switch,Redirect} from 'react-router-dom';
import Logout from './container/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asynchComponent from './hoc/asynchComponent/asynchComponent';

const Orders = asynchComponent(() => {
    return import('./container/Order/Orders');
});

const Checkout = asynchComponent(() => {
  return import('./components/Checkout/Checkout');
});

const Auth = asynchComponent(() => {
  return import('./container/Auth/Auth');
}); 

class App extends Component{

  componentDidMount(){
    this.props.onSignupCheck();
  }

 

  render(){

    let route=(
      <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/authentication" component={Auth}/>
            <Redirect to="/" />
      </Switch>    
    );
    if(this.props.isAuth){
      route = (
        <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/order" component={Orders} />
                <Route path="/logout" component={Logout}/>
                <Route path="/authentication" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
        </Switch>    
      );
    }
  return (
    <Aux>
      <Layout>
         {route}
      </Layout>
    </Aux>
  );
}
}

const matchStateToProps = state => {
  return{
    isAuth:state.auth.token !== null
  }
}

const matchDispatchToProps = dispatch => {
  return{
    onSignupCheck : () => dispatch(actions.checkIsAuthenticated())
  }
}

export default connect(matchStateToProps,matchDispatchToProps)(App);
