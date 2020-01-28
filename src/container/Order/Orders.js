import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorMessage from '../../hoc/withErrorMessage/withErrorMessage'
import axios from '../../axios-orders';
import {connect} from 'react-redux';

class Orders extends Component{
    state={
        orders:[],
        loading:true,
        err:false
    }
    componentDidMount(){
        const queryParams = '?auth='+this.props.token+'&orderBy="userId"&equalTo="'+this.props.userId+'"';
        axios.get("/orders.json"+queryParams)
        .then(res => {
            const orders=[];
            for(let key in res.data){
                let order={
                    ingredients:{...res.data[key].ingredients},
                    price:res.data[key].totalPrice,
                    key:key
                }
                orders.push(order);
            }
            this.setState({
                orders:orders,
                loading:false
            })    
        })
        .catch(err=>{this.setState({loading:false,
                                    err:true})
                                });
    }

    render(){
        let orders=null;
        if(this.state.loading){
            orders=<Spinner />
        }
        if(!this.state.loading && this.state.orders.length !== 0){
            orders=this.state.orders.map(el => {
                return <Order key={el.key} ingredients={el.ingredients} price={el.price}/>
            });
        }
        if(this.state.err){
            orders=<p>Can't load your orders!</p>
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const matchStateToProps = state => {
    return{
        token:state.auth.token,
        userId:state.auth.userId
    }
}

export default connect(matchStateToProps)(withErrorMessage(Orders,axios));