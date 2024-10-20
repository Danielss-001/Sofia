import { IDash } from "./dash_interface.js";

export class Out extends IDash{
    Start(){
        this.clearContent();
        this.pag_dash.innerHTML = `
            <div class="title_container_dash">
                <h3 class="title_text_dash">Cerrar Sesión</h3>
                <h5 class="commentary">Last Authorization</h5>
            </div>
            <div class="module_container_dash">
                <div class="cierre_sesion">
                    <h3>¡Estas seguro!</h3>
                    <h5>¿Deseas cerrar sesión?</h5>
                    <button type="button" class="empezar_btn out">Cerrar Sesion</button>
                </div>
            </div>
        `;
        this.content_dash.appendChild(this.pag_dash);   //  Agregamos al dash

        document.querySelector('.empezar_btn.out').addEventListener('click',()=>{
            this.OutSession();
        });

    }

    OutSession(){
        if(this.main.token){
            this.main.token = null;
            this.main.username = null;
            this.main.name = null;
            this.main.estructura = 1;
            this.main.competencias = 2;
            this.main.comportamientos = 3;
            this.main.objetividad = 4;
            this.main.preguntas = 5;
            this.main.feedback = 6;
            this.main.total = 7;

            //  Cambio de pagina
        }
        this.main.factory.changePage('home');
    }
}
