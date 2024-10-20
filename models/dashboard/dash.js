import { IDash } from "./dash_interface.js";

export class Dash extends IDash{
    Start(){
        //Obtner fecha
        const fechaActual = new Date();

        // Obtener el día de la semana (0 = Domingo, 1 = Lunes, etc.)
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const diaActual = diasSemana[fechaActual.getDay()];
        
        // Obtener la fecha completa (día, mes, año)
        const dia = fechaActual.getDate(); // Día del mes
        const mes = fechaActual.getMonth() + 1; // Mes (0 = Enero, 1 = Febrero, etc.), sumamos 1 para tener un valor humano
        const anio = fechaActual.getFullYear(); // Año

        this.clearContent();
        this.pag_dash.innerHTML = `
            <div class="saludo_container">
                <h3 class="saludo_user">Hola! ${this.main.name} </h3>
                <h5 class="fecha">Hoy es ${diaActual}, ${dia} del mes ${mes}/${anio} </h5>
            </div>
            <div class="modules inputs_container">
                <div class="pilar e">
                    <h3 class="title_modules_buttons">Preparación y Estructura</h3>
                    <h5 class="calification_text">Calificación: ${this.main.estructura}</h5>
                </div>
                <div class="pilar co">
                    <h3 class="title_modules_buttons">Identificación de Competencias Clave</h3>
                    <h5 class="calification_text">Calificación: ${this.main.competencias}</h5>
                </div>
                <div class="pilar com">
                    <h3 class="title_modules_buttons">Evaluación de Comportamientos y Resultados</h3>
                    <h5 class="calification_text">Calificación: ${this.main.comportamientos}</h5>
                </div>
                <div class="pilar ob">
                    <h3 class="title_modules_buttons">Objetividad y Consistencia</h3>
                    <h5 class="calification_text">Calificación: ${this.main.objetividad}</h5>
                </div>
                <div class="pilar pre">
                    <h3 class="title_modules_buttons">Escucha Activa y Preguntas de Seguimiento</h3>
                    <h5 class="calification_text">Calificación: ${this.main.preguntas}</h5>
                </div>
                <div class="pilar fed">
                    <h3 class="title_modules_buttons">Feedback y Comunicación Transparente</h3>
                    <h5 class="calification_text">Calificación: ${this.main.feedback}</h5>
                </div>
                <div class="pilar total">
                    <h2>${this.main.total}</h2>
                    <h3>Total calificación</h3>
                    <h5>Entrevistas por Competencias</h5>
                    <div class="test_btn_container">
                        <button type="button" class="examen_btn">TEST</button>
                    </div>
                </div>
            </div>
        `;
        this.content_dash.appendChild(this.pag_dash);   //  Agregamos al dash
        
        //  Estructura click
        document.querySelector('.pilar.e').addEventListener('click',()=>{
            // Peticion para enviar datos como el nombre y llamar los chats 
            this.Post_data('/chat_structure','structure');           
            
        });

        //  Competencias click
        document.querySelector('.pilar.co').addEventListener('click',()=>{
            this.Post_data('/chat_competencias','competencias');
        });

        //  Comportamientos click
        document.querySelector('.pilar.com').addEventListener('click',()=>{
            this.Post_data('/chat_comportamientos','comportamientos');
        });

        //  Objetividad click
        document.querySelector('.pilar.ob').addEventListener('click',()=>{
            this.Post_data('/chat_objetividad','objetividad');
        });

        //  Preguntas click
        document.querySelector('.pilar.pre').addEventListener('click',()=>{
            this.Post_data('/chat_preguntas','preguntas');
        });

        //  Feedback click
        document.querySelector('.pilar.fed').addEventListener('click',()=>{
            this.Post_data('/chat_feedback','feedback');
        });

        //  Test click
        // Recuerda que falta implementar aqui el endpoint de test final
        document.querySelector('.examen_btn').addEventListener('click',()=>{
            this.Post_data('/chat_test','test');
        });
    }

    //  Posteamos el nombre de usuario y obtenemosd los chat
    async Post_data(module,pag){
        try {
            const response = await fetch(`${this.main.url}/modules/data_send/?name=${this.main.name}`);

            if(response.ok){
                console.log("Enviado nombre satisfactoriamente");
                const get_chat = await this.Get_User_chats(module);
                if(get_chat){
                    console.log("Obtuvimos los chat satisfactoriamente");
                    this.dashboard.factory_dash.changeDash(pag);
                }
                
            }
            else{
                console.error("Error Al enviar nombre al backend");
            }

        }catch(error){
            console.error("Error con el backend ", error);
        }
    }

    // Obtenemos los chats del usuario
    async Get_User_chats(module){
        if(this.main.token){

            const response = await fetch(`${this.main.url}/modules${module}`,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${this.main.token}` // Pasamos el token al bearer  
                }
            });
    
            if(!response.ok){
                throw new Error(`Ocurrio un error al obtener los chat del modulo: ${response.status}`);
            }
            else{
                return true;
            }
        }
        else{
            throw new Error(`El token actual es: ${this.main.token}`);
        }

    }
     
}