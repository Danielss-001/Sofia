import { IPag } from "./page_interface.js";

export class NoAccepted extends IPag{
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="user_created_container">
                    <div class="created_container">
                        <div class="container_text">
                            <h1>¡No Autorizado!</h1>
                            <h3>Debes iniciar sesion para acceder</h3>
                        </div>
                        <div class="login_container">
                            <button type="button" class="login_btn">Inicia Sesion</button>
                            <div id="home_btn_back" class="finish_container created">
                                    <i class='bx bx-chevrons-left'></i>
                                    <h4>HOME</h4>
                            </div>
                        </div>
                    </div>
            </div>
        
        `;
        this.content_pag.appendChild(this.pag);
        
        document.querySelector('.login_btn').addEventListener('click',()=>{
            this.main.factory.changePage('login')
        });

        document.getElementById('home_btn_back').addEventListener('click',()=>{
            this.main.factory.changePage('home');
        });
    }

}