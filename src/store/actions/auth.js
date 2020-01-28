import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const auth = (email,password,method) => {
    return dispatch => {
        const payload={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url;
        if(method === "Sign Up"){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbACFHSF_o9Z4mwAoEQalYRazS-YaAqrc";
        }else{
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbACFHSF_o9Z4mwAoEQalYRazS-YaAqrc";
        }
        dispatch(authStart());
        Axios.post(url,payload)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('idToken',res.data.idToken);
            localStorage.setItem('localId',res.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccessful(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err => {
            dispatch(authFail(err));
            
        })
    }
}



export const authSuccessful = (idToken,localId) => {
    return {
        type:actionTypes.AUTH_SUCCESSFUL,
        idToken:idToken,
        userId:localId
    }
}

export const authFail = (err) => {
    return{
        type:actionTypes.AUTH_FAIL,
        err:err.response
    }
}

export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authRedirectPath = (path) => {
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkIsAuthenticated = () => {
return dispatch =>{
    const localId = localStorage.getItem('localId');
    const idToken = localStorage.getItem('idToken');
    const expirationDate =new Date(localStorage.getItem('expirationDate'));
    if(idToken === null){
        dispatch(authLogout());
    }else {
        if(expirationDate <= new Date() ){
        dispatch(authLogout());
        }else{
            dispatch(authSuccessful(idToken,localId));
            dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
        }
    }
}
   
}

export const checkAuthTimeout = (time) => {
    return dispatch => setTimeout(() => {
        dispatch(authLogout());
    },time*1000)
}