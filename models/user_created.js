import { IPag } from "./page_interface.js";

export class UserCreated extends IPag{
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="user_created_container">
                    <div class="created_container">
                        <div class="container_text">
                            <h1>¡Usuario creado con exito!</h1>
                            <h3>Inicia sesion ahora</h3>
                        </div>
                        <div class="login_container">
                            <button class="login_btn">Inicia Sesion</button>
                            <div class="finish_container created">
                                    <i class='bx bx-chevrons-left'></i>
                                    <h4>HOME</h4>
                            </div>
                        </div>
                    </div>
            </div>
        
        `;
        this.content_pag.appendChild(this.pag);
        document.querySelector('.finish_container.created').addEventListener('click',()=>{
            this.main.factory.changePage('home');
        });

        document.querySelector('.login_btn').addEventListener('click',()=>{
            this.main.factory.changePage('login');
        });
    }
}