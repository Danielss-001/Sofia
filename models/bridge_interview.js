import { IPag } from "./page_interface.js";

export class BridgeInterview extends IPag{
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
        <div class="bridge_container">
        <div class="bridge_data_container">
        <div class="container_bridge">
        <h1 class="title_sofia">SOFIA</h1>
        <p class="text_data">Loading°°°</p>
        </div>
        <div class="login_container">
        <button class="interview_btn">Iniciar Entrevista</button>
        <div class="finish_container bridge">
        <i class='bx bx-chevrons-left'></i>
        <h4>Atras</h4>
        </div>
        </div>
        </div>
        </div>
        
        `;
        this.content_pag.appendChild(this.pag);
        document.querySelector('.interview_btn').addEventListener('click',()=>{
            this.main.factory.changePage('interview');
        });
        
        document.querySelector('.finish_container.bridge').addEventListener('click',()=>{
            this.main.factory.changePage('start');
        });
        const new_user = {
            "name":this.main.name,
            "perfil":this.main.perfil
        };   
        this.postData();
    }

    async postData(){
        const text_data = document.querySelector('.text_data');
        
        try{
            const response = await fetch(`${this.main.url}/interview/data/?name=${this.main.name}&perfil=${this.main.perfil}`,{method: 'POST'})

            if(response.ok){
                const data = await response.json();
                text_data.textContent = data.message || 'No se recibio el mensaje';

            }else{
                text_data.textContent = 'Error al comunicarse con el backend';        
            }
        }
        catch(error){
            text_data.textContent = 'Error en la solicitud ' + error;
        }
    }

}