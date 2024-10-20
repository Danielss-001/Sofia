import { IPag } from "./page_interface.js";
import { FactoryDash } from "./dashboard/dash_factory.js";

export class Dashboard extends IPag{
    constructor(main){
        super(main);
        this.factory_dash = new FactoryDash(this.main,this);
    }

    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="dashboard_pag_container">
                <div class="dashboard_container">
                    <div class="dash_base">
                        <div class="menu_dash_container">
                            <div class="user_logos">
                                <div class="user_avatar">
                                    <i class='bx bxs-user-circle' ></i>
                                </div>
                                <h3 class="title_name">${this.main.name}</h3>
                                <h5 class="title_username">${this.main.username}</h5>
                            </div>
                            <div class="menu_btns_user">
                                <div class="title_btn dash">
                                    <i class='bx bxs-home' ></i>
                                    <h3 class="title_dash">Dashboard</h3>
                                </div>
                                <div class="title_btn trainner">
                                    <i class='bx bx-brain'></i>
                                    <h3 class="title_trainner">Entrenamiento</h3>
                                </div>
                                <div class="title_btn setting">
                                    <i class='bx bx-cog' ></i>
                                    <h3 class="title_setting">Configuración</h3>
                                </div>
                                <div class="title_btn out">
                                    <i class='bx bx-log-out' ></i>
                                    <h3 class="title_out">Cerrar Sesion</h3>
                                </div>
                            </div>
                        </div>

                        <div class="user_module_container">

                        //  Aqui Se modifica el contenedor //  

                        </div>
                    </div>
                </div>
            </div>
        
        `;
        this.content_pag.appendChild(this.pag);

        document.querySelector('.title_btn.dash').addEventListener('click',()=>{
            this.factory_dash.changeDash('dash');
        });

        document.querySelector('.title_btn.out').addEventListener('click',()=>{
            this.factory_dash.changeDash('out');
        });

        //  Principal del dash
        this.factory_dash.changeDash('dash');
        
    }

    
}