import {UI} from './models/UI.js';
import { PageFactory } from './models/page_factory.js';

export class Main{
    constructor(){
        this.menu = new UI(this);   // UI del ususario
        this.factory = new PageFactory(this);   // Factoria para controlar las paginas
        this.url = 'https://practica-backend-mw9n.onrender.com';
        this.url_socket = 'wss://practica-backend-mw9n.onrender.com';
        this.token = null;
        this.username = null;
        this.name = null;
        this.perfil = null;
        this.estructura = "load";
        this.competencias = "load";
        this.comportamientos = "load";
        this.objetividad = "load";
        this.preguntas = "load";
        this.feedback = "load";
        this.total = "load";
    }
    Start(){
        
        this.menu.Start();  //  Inicializa la UI //
        this.factory.changePage('home');
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const main = new Main();
    main.Start();
});