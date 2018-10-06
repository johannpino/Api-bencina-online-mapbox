import '../css/app.scss';
import 'bootstrap';
import 'babel-polyfill';
import {API} from './api.js';

const api = new API();
const UI = require('./ui.js')

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    api.obtenerDatos()
    .then(data => {
        if(data !== 'Not Found'){
            ui.showBencina(data.result);
        }else{
            ui.showMessage('Not Found', 'alert alert-danger');
        }
    })

})

