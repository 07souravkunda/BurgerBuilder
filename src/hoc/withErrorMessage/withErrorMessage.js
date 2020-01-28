import React , { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Modal from '../../components/UI/Modal/Modal';


const withErrorMessage = (WrappedComponent,axios) => {
    
    return class Test extends Component{
        state={
            error:null
        }
        errorConfirmedHandler=() => {
            this.setState({
                error:null
            })
        }
        constructor(props){
            super(props);
            this.reqInterceptor=axios.interceptors.request.use(req=>req,error=> {
                this.setState({
                    error:error
                })
            })
            this.resInterceptor=axios.interceptors.response.use(res => res,error => {
                this.setState({
                    error:error
                })
            })
        }
        componentWillUnmount(){
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} cancelPurchase={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
    
}

export default withErrorMessage;