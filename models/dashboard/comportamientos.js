import { IDash } from "./dash_interface.js";

export class Comportamientos extends IDash{
    constructor(main, dashboard){
        super(main, dashboard);
        this.socket = null;
    }

    Start(){
        this.clearContent();
        this.pag_dash.innerHTML = `
            <div class="title_container_dash">
                <h3 class="title_text_dash">Evaluación de Comportamientos y Resultados</h3>
                <h5 class="commentary">Chat with SOFIA</h5>
            </div>
            <div class="module_container_dash">
                <div class="calification_container_data">
                    <h2 class="cal_title">${this.main.comportamientos}</h2>
                    <h3>Calificación</h3>
                    <h5>Mejora tus habilidades</h5>
                    <button type="button" class="calification_change_btn">Finalizar</button>
                </div>
                <div class="chat_dash_pilar">
                    <div class="chat dash">
                            <div class="chat_box dash"></div>
                            <form class="form_chat dash">
                                <div class="input_chat dash">
                                    <input type="text" placeholder="Escribe aqui..." class="chat_control dash">
                                </div>
                                <i class='bx bxs-send dash' ></i>
                            </form>
                            
                    </div>
                </div>
            </div>
        `;
        this.content_dash.appendChild(this.pag_dash);   //  Agregamos al dash

        // Conectamos el websocket
        this,this.connectWebSocket();

        document.querySelector('.bx.bxs-send.dash').addEventListener('click',()=>{
            this.SendMessage();
        });
        
        // dar click en enter para enviar al chat
        document.querySelector('.chat_control.dash').addEventListener('keydown',function(e){ // enviar a dar boton de enter
            if(e.key=='Enter'){
                this.SendMessage();
                e.preventDefault();
            }
        }.bind(this));

        document.querySelector('.calification_change_btn').addEventListener('click', async()=>{
            // Enviamos solucitud para cambiar base de datos
            try {
                // Enviamos solicitud para cambiar base de datos
                await this.CombinedPostData('comportamientos_calification', 'comportamientos_base_chat');
                // Cambiamos el dashboard solo después de que las peticiones hayan sido exitosas
                this.dashboard.factory_dash.changeDash('dash');
                this.closeWebSocket();
            } catch (error) {
                console.error('Error al actualizar la base de datos o cambiar el dashboard:', error);
            }
        });
    }

    //  Metodo para conectasr a la websocket
    connectWebSocket(){
        this.socket = new WebSocket(`${this.main.url_socket}/modules/module_chat`);

        this.socket.onopen = ()=>{
            console.log("WebSocket connected");
        };

        this.socket.onmessage = (event)=>{
            const data = event.data;
            // Enviamos mensaje al bloque de codigo
            this.ReceiveMessage(data); // Manipula y configura el mensaje recibido
        }

        this.socket.onerror = (error)=>{
            console.log('Error en WebSocket ', error);
        }

        this.socket.onclose = (event) => {
            //  Verificamos si el websocket se ha cerrado para:
            //  1. Habilitar el boton
            //  2. Obtener la calificacion del backend y actualizar el DOM 
            if(event.code === 1000){ 
                // Obtenemos la calificacion del backend
                this.GetData(); // Llamamos a la funcion de peticion    
                const button = document.querySelector('.calification_change_btn');
                button.style.display = 'inline-block';
            }
        }
    }

    // Obtenemos la calificacion del backend
    async GetData(){
        const response = await fetch(`${this.main.url}/modules/calification`);

        if(!response.ok){ // Verificamos si la respuesta es diiferente al ok
            throw new Error('Error en la solisitud ',response.status);
        }

        // Convertimos la respuesta a un json
        const data = await response.json();

        //  Actualizamos el DOM
        this.main.comportamientos = data.calificacion;
        document.querySelector('.cal_title').textContent = this.main.estructura;
    }

    //  Metodo para enviar respuesta a la caja del chat 
    ReceiveMessage(message){
        //  Creamos elemento para guardar mensaje de la IA
        const message_element = document.createElement('div');
        message_element.className = 'messageElement dash';
        message_element.textContent = `SOFIA: ${message}`;

        //  Añadimos div del mensaje a la caja de chat
        const chat_box = document.querySelector('.chat_box.dash');
        chat_box.appendChild(message_element);

        // Aplicamos el auto scroll
        chat_box.scrollTop = chat_box.scrollHeight;
    }

    //  Cerrar WebSocket
    closeWebSocket(){
        if(this.socket){
            this.socket.close();
        }
    }

    SendMessage(){
        const input = document.querySelector('.chat_control.dash');
        const message_user = input.value.trim(); //  Obtenemos los datos del usuario

        if(message_user){
            //  Creamos elemento para almacenar el input del usuario
            const messageElement = document.createElement('div');
            messageElement.className = 'messageElement dash';
            messageElement.textContent = `TÚ: ${message_user}`;

            //  Añadimos a la caja container del chat
            const chat_box = document.querySelector('.chat_box.dash');
            chat_box.appendChild(messageElement);

            //  Aplicamos auto-scroll
            chat_box.scrollTop = chat_box.scrollHeight;

            //  Enviar mensaje al websocket
            if(this.socket && this.socket.readyState === WebSocket.OPEN){
                this.socket.send(message_user);
            }
            else{
                console.error('WebSocket desconnected');
            }

            input.value = "";

        }
    }

    //
    //
    //
    //
    //
    // Peticion post para actualizar backend | chat | calificaciones |
    async PostDataCalification(endpoint){
        if(this.main.token){
            const response = await fetch(`${this.main.url}/modules/${endpoint}`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${this.main.token}` //  Pasamos el token al backend
                }
            });
            if(!response.ok){
                throw new Error(`Ocurrio un error en commit a base de datos ${response.status}`);
            }
            return response
        }
        else{
            throw new Error(`El token no esta activado`);
        }
    }

    //  Chat | Base Data
    async PostDataChat(endpoint){
        if(this.main.token){
            const response = await fetch(`${this.main.url}/modules/${endpoint}`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${this.main.token}` //  Pasamos el token al backend
                }
            });
            if(!response.ok){
                throw new Error(`Ocurrio un error en commit a base de datos ${response.status}`);
            }
            return response
        }
        else{
            throw new Error(`El token no esta activado`);
        }        
    }   

    // Combinamos las dos peticiones para hacer el cambio 
    async CombinedPostData(calification_endpoint,chat_endpoint){
        const [calificacion,chats] = await Promise.all([this.PostDataCalification(calification_endpoint),this.PostDataChat(chat_endpoint)]);
        
        return [calificacion,chats] // Nos servira para poder cambiar la pagina una vez finaliza la promesa
    }

}
