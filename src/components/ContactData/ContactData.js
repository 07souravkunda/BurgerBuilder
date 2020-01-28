import React,{Component} from 'react';
import Styles from './ContactData.module.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import withErrorMessage from '../../hoc/withErrorMessage/withErrorMessage';
import {Redirect } from 'react-router-dom';


class contactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validate:{
                    isRequired:true
                },
                isValid:false,
                isTouched:false
            },
            address:{
                elementType:'textarea',
                elementConfig:{
                    type:'text',
                    placeholder:'Your address'
                },
                value:'',
                validate:{
                    isRequired:true
                },
                isValid:false,
                isTouched:false
            },
            pin:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your pin'
                },
                value:'',
                validate:{
                    isRequired:true,
                    isPin:true
                },
                isValid:false,
                isTouched:false

            },
            contactNumber:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your contact number'
                },
                value:'',
                validate:{
                    isRequired:true,
                    isContactNumber:true
                },
                isValid:false,
                isTouched:false
            },
            alternateNumber:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your alternate number'
                },
                value:'',
                validate:{
                    isRequired:true,
                    isContactNumber:true

                },
                isValid:false,
                isTouched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validate:{},
                isValid:true,
                value:'Fastest'
            },
            email:{
                elementType:'email',
                elementConfig:{
                    type:'text',
                    placeholder:'Your mail'
                },
                value:'',
                validate:{
                    isRequired:true,
                    isEmail:true
                },
                isValid:false,
                isTouched:false
            }
        },
        isFormValid:false
    }
   
    placeOrder=(event)=>{
        event.preventDefault();
        const orderForm = {};
        for(let key in this.state.orderForm){
            orderForm[key] = this.state.orderForm[key].value;
        }
        const order = {
            userId:this.props.userId,
            ingredients:{
                ...this.props.ingredients
            },
            totalPrice:this.props.price,
            orderData:orderForm
        };
        this.props.onPlaceOrder(order,this.props.token);
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
        if(rules.isContactNumber){
            const regContactNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
            isValid = regContactNumber.test(element.value) && isValid;
        }
        if(rules.isPin){
            const regPin = /^[1-9][0-9]{5}$/;
            isValid = regPin.test(element.value) && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event,formId,state) => {
        const updatedForm = {...state.orderForm};
        const updatedFormDeep = {...updatedForm[formId]};
        updatedFormDeep.value = event.target.value;
        updatedFormDeep.isValid=this.checkValidate(updatedFormDeep,updatedFormDeep.validate);
        updatedFormDeep.isTouched=true;  
        updatedForm[formId] = updatedFormDeep;
        this.setState({
            orderForm : updatedForm
        });
        this.checkFormValidate();
    }
    checkFormValidate=() => {
        let isFormValid = true;
        for(let key in this.state.orderForm){
            isFormValid = this.state.orderForm[key].isValid && isFormValid;
        }
        this.setState({isFormValid:isFormValid});
    }
    render(){
        let redirect = null;
        const formsElementArray=[];
        for(let key in this.state.orderForm){
            formsElementArray.push({ 
                id:key,
                config:this.state.orderForm[key]
            });
        };
        let form=(
      
            <form onSubmit={this.placeOrder}>
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
               

            </form>    
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        if(this.props.purchased){
            redirect=<Redirect to='/' />
        }
        return (
        <div className={Styles.ContactData}>
            {redirect}
            <h3>Enter your personal data</h3>
            {form}
            <Button disabled={!this.state.isFormValid} type="Continue" clicked={this.placeOrder}>Order</Button>
        </div>
        );
    }
   
}

const matchStateToProps = state => {
    return {
        ingredients:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        purchased:state.order.purchased,
        token:state.auth.token,
        userId:state.auth.userId,
        isAuth:state.auth.token !== null
    }
}
const matchDispatchToProps = dispatch => {
    return {
        onPlaceOrder : (order,token) => dispatch(actions.placeOrder(order,token))
    }
}


export default connect(matchStateToProps,matchDispatchToProps)(withErrorMessage(contactData,axios));