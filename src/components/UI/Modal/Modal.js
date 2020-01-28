import React,{Component} from 'react';
import Styles from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
   shouldComponentUpdate=(prevProps,prevState) => {
        return prevProps.show !== this.props.show || prevProps.children !== this.props.children;
    }
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show}
                cancelPurchase={this.props.cancelPurchase}/>
                <div className={Styles.Modal}
                style={this.props.show ? null : {
                    transform:"translateY(-200%)",
                    opacity:"0"
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
   
}

export default Modal;