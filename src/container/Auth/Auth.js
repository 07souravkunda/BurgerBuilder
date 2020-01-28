import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Styles from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
class Auth extends Component{
    state = {
        inputs : {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validate:{
                    isRequired:true,
                    isEmail:true
                },
                isValid:false,
                isTouched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Passoword'
                },
                value:'',
                validate:{
                    isRequired:true
                },
                isValid:false,
                isTouched:false
            }
        },
        method:"Sign Up"
    }

    checkValidate= (element,rules) => {
        let isValid=true;
        if(rules.isRequired){
            isValid = element.value.trim() !== '' && isValid;
        }
        if(rules.isEmail){
            const regEmail =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = regEmail.test(element.value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event,formId,state) => {
        const updatedForm = {...state.inputs};
        const updatedFormDeep = {...updatedForm[formId]};
        updatedFormDeep.value = event.target.value;
        updatedFormDeep.isValid=this.checkValidate(updatedFormDeep,updatedFormDeep.validate);
        updatedFormDeep.isTouched=true;  
        updatedForm[formId] = updatedFormDeep;
        this.setState({
            inputs : updatedForm
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthHandler(this.state.inputs.email.value,this.state.inputs.password.value,this.state.method);

    }
    clickHandler=() => {
        let method = 'Sign Up'
        if(this.state.method === 'Sign Up'){
            method='Sign In';
        }
        this.setState({method:method})
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/')
            this.props.onAuthRedirectPath('/');
    }

    render(){
        const formsElementArray=[];
        for(let key in this.state.inputs){
            formsElementArray.push({ 
                id:key,
                config:this.state.inputs[key]
            });
        };
        let para = <h4>already have an account <span onClick={this.clickHandler}>Sign In</span> instead</h4>
        if(this.state.method === 'Sign In'){
            para = <h4>no existing account <span onClick={this.clickHandler}>Sign Up</span> instead</h4>
        }
        let form=(
            <form onSubmit={this.onSubmitHandler}>
                <h3>{this.state.method} to continue</h3>
               {formsElementArray.map(el => {
                   return <Input 
                   key={el.id}
                   elementType={el.elementType}
                   elementConfig={el.config.elementConfig}
                   value={el.config.value}
                   isNotValid={!el.config.isValid}
                   isTouched={el.config.isTouched}
                   changed={event=>this.inputChangedHandler(event,el.id,this.state)}/>
               })}
               <Button  type="Continue" clicked={(event) => this.onSubmitHandler(event)}>{this.state.method}</Button>
               {para}
            </form>    
        );
        if(this.props.loading){
            form=<Spinner />
        }
        
        let error = null;
        if(this.props.errorMessage){
            error=<p>{this.props.errorMessage.message}</p>
        }
        let redirect=null;
        if(this.props.isAuth){
            redirect = <Redirect to={this.props.path} />
        }
        return (
        <div className= {Styles.Auth}>
            {redirect}
            {error}
            {form}
        </div>
        );
    }
}

const matchStateToProps = state => {
    return{
        errorMessage:state.auth.error,
        loading:state.auth.loading,
        isAuth:state.auth.token !== null,
        path:state.auth.authRedirectPath,
        building:state.burgerBuilder.building
    }
}

const matchDispatchToProps = dispatch => {
    return {
        onAuthHandler : (email,password,method) => dispatch(actions.auth(email,password,method)),
        onAuthRedirectPath:(path) => dispatch(actions.authRedirectPath(path))
    }
}
export default connect(matchStateToProps,matchDispatchToProps)(Auth);

