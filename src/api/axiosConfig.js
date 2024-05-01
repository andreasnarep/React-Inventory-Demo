import axios from 'axios';

export default axios.create({
    //baseURL: 'https://core-memento-421408.lm.r.appspot.com',
    baseURL: 'http://192.168.1.234:8080',
    headers: {"ngrok-skip-browser-warning": "true"}
});