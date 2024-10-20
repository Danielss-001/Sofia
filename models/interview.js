import {IPag} from './page_interface.js';

export class Interview extends IPag{
    constructor(main){
        super(main);
        this.socket = null;
    }
    Start(){
        this.clearContent(); //Limpiamos el div contenedor
        this.pag.innerHTML = `
            <div class="chat_interview_container">
                    <div class="interview_container">
                        <div class="chat">
                            <div class="chat_box"></div>
                            <form class="form_chat">
                                <div class="input_chat">
                                    <input type="text" placeholder="Escribe aqui..." class="chat_control">
                                </div>
                                <i class='bx bxs-send' ></i>
                            </form>
                            <div class="btns_container">
                                <i class='bx bx-chevrons-left' ></i>
                                <div class="finish_container">
                                    <h4>Finalizar</h4>
                                    <i class='bx bx-chevrons-right'></i>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    
        `;
        this.content_pag.appendChild(this.pag);

        //  Conectamos el websocket
        this,this.connectWebSocket();

        document.querySelector('.bx.bxs-send').addEventListener('click',()=>{   //  Boton de enviar al chat
            this.SendMessage();
        });

        document.querySelector('.chat_control').addEventListener('keydown',function(e){ // enviar a dar boton de enter
            if(e.key=='Enter'){
                this.SendMessage();
                e.preventDefault();
            }
        }.bind(this));

        document.querySelector('.bx.bx-chevrons-left').addEventListener('click',()=>{   //  Click atras 
            this.main.factory.changePage('start');
            this.closeWebSocket();  //  Cerramos coneccion si cambia de pagina
        });

        document.querySelector('.finish_container').addEventListener('click',()=>{  // Boton finalizar entrevista
            
            this.main.factory.changePage('evaluation');
            this.closeWebSocket();  //  Cerramos coneccion si cambia de pagina
        });
    }

    //  Conectar al websocket
    connectWebSocket(){
        this.socket = new WebSocket(`${this.main.url_socket}/interview/chat`);

        this.socket.onopen = () =>{
            console.log('WebSocket connected');
        };

        this.socket.onmessage = (event)=>{
            const data = event.data;
            this.receiveMessage(data);  // Se manipula el mensaje recibido
        };

        this.socket.onerror = (error) =>{
            console.error('Error en websocket ',error);
        };

        this.socket.onclose=()=>{
            console.log('WebSocket closed');
        };

    }   

    //  Cerrar WebSocket
    closeWebSocket(){
            if(this.socket){
                this.socket.close();
            }
    }

    //  Mostrar mensaje recibido de la AI
    receiveMessage(message){
        const messageElement = document.createElement('div');
        messageElement.className = "messageElement";
        messageElement.textContent = `SOFIA: ${message}`;

        // Añadir mensaje a la caja de chat
        const chat_box = document.querySelector('.chat_box');
        chat_box.appendChild(messageElement);

        //  Desplazar vista hacia abajo
        chat_box.scrollTop = chat_box.scrollHeight;

    }

    //  Metodo para enviar mensaje
    SendMessage(){
        const input = document.querySelector('.chat_control');
        const message_user = input.value.trim();    // Se obtiene el input del usuario 

        if(message_user){
            //Crear nuevo elemento para el mensaje
            const messageElement = document.createElement('div');
            messageElement.className = "messageElement";
            messageElement.textContent = `Tú: ${message_user}`;

            // Añadir mensaje a la caja de chat
            const chat_box = document.querySelector('.chat_box');
            chat_box.appendChild(messageElement);

            //  Desplazar vista hacia abajo
            chat_box.scrollTop = chat_box.scrollHeight;

            //  Enviar mensaje al websocket
            if(this.socket && this.socket.readyState === WebSocket.OPEN){
                this.socket.send(message_user);
            }
            else{
                console.error('WebSocket desconnected');
            }

            // Limpiamos el campo
            input.value = "";
        }
    }

    
}