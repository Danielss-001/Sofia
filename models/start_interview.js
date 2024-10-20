import { IPag } from "./page_interface.js";

export class StartInterview extends IPag{
    
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
        <div class="start_interview_container">
        <div class="get_data_container">
        <h2>S O F I A</h2>
        <p class="text_p">|||  LOADING °°° |||</p>
        <form class="form_data">
        <div class="input_data">
        <input type="text" placeholder="Nombre" class="input_control name">
        </div>
        <div class="input_data">
        <input type="text" id ="input_control" placeholder="Perfil" class="input_control perfil">
        </div>
        </form>
        <button class="send_btn">Enviar</button>
        <i class='bx bx-chevrons-left' ></i>
        </div>
        </div>
        
        `;
        this.content_pag.appendChild(this.pag);
        
        
        document.querySelector('.send_btn').addEventListener('click',()=>{   //  Boton de enviar
            const name = document.querySelector('.input_control');
            const perfil = document.getElementById('input_control');
            if(name.value && perfil.value){
                this.postDataVariables();
                this.main.factory.changePage('bridge');
            }
            else{
                name.style.border = '.5px solid red';
                perfil.style.border = '.5px solid red';
            }
        });
        document.querySelector('.bx.bx-chevrons-left').addEventListener('click',()=>{  // Boton de atras
            this.main.factory.changePage('home');
            //  Fetch para comunicar con backend y empezar websockets interview
        });
        this.getData();
    }

    //  Metodo Get al Backend
    async getData(){
        const text = document.querySelector('.text_p');
        try{
            const response = await fetch(`${this.main.url}/interview/start/`);
            if(response.ok){
                const data = await  response.json();
                
                text.textContent = data.message ||'No se recibio el mensaje.';
            }
            else{
                text.textContent = 'Error al comunicarse con el backend';        
            }
        }
        catch(error){
            text.textContent = 'Error en la solicitud ' + error;
        }
    }

    //  Metodo para asignar variables name y perfil
    postDataVariables(){
        const name = document.querySelector('.input_control.name');
        const perfil = document.querySelector('.input_control.perfil');

        this.main.name = name.value;
        this.main.perfil = perfil.value;
    }
    
}