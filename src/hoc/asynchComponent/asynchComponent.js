import React,{Component} from 'react';

const asynchComponent = importComponent => {
    return class AsynchComponent extends Component{
        state={
            component:null
        }
        componentDidMount(){
            importComponent()
            .then((cmp) => {
                this.setState({component:cmp.default})
            })
        }
        render(){
            let C = this.state.component;
            return(
                C ? <C {...this.props}/> : null
            );
        }
    }
}

export default asynchComponent;