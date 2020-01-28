import Axios from 'axios';

const instance = Axios.create({
    baseURL : 'https://burgerapp-86de2.firebaseio.com/'
});

export default instance;