import { IPag } from "./page_interface.js";


export class Home extends IPag{
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="home_container">
                    <div class="bienvenida_container">
                        <h2>Bienvenid@ a SOFIA</h2>
                        <h4>Tu entrenador de entrevistas por competencias personal</h4>
                        <h4>¡Si ya nos conocemos, inicia sesion! En caso contrario, dale click en empezar</h4>
                        <button class="empezar_btn">Empezar</button>
                        <button class="login_btn">Inicia Sesion</button>
                    </div>
            </div>
    
        `;
        this.content_pag.appendChild(this.pag);
        const star_btn = document.querySelector('.empezar_btn').addEventListener('click',()=>{
            this.main.factory.changePage('start');
        });

        //  Boton de iniciar sesion
        document.querySelector('.login_btn').addEventListener('click',()=>{
            this.main.factory.changePage('login');
        });
    }
    
}