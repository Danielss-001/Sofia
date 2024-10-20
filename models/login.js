import { IPag } from "./page_interface.js";

export class Login extends IPag {
    
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="login_d_container">
                    <div class="login_form_container">
                        <div class="form_container_data">
                            <div class="login_left_container">
                                <h3>Hola,</h3>
                                <h3>Bienvenid@,</h3>
                                <h5>¡Inicia sesion y explora tu dashboard y mejora!</h5>
                            </div>
                            <div class="login_right_container">
                                <form class="form_data_login">
                                    <div class="input_data_container">
                                        <label for="username">Nombre de usuario</label>
                                        <input type="text" id="username" name="username" placeholder="Username" class="input_control username">
                                    </div>
                                    <div class="input_data_container">
                                        <label for="password">Contraseña</label>
                                        <input type="password" id="password" name="password" placeholder="Password" class="input_control password">
                                    </div>
                                    <h5 class="no_access_text">Use parametros aceptados</h5>
                                    <div class="login_btns">
                                        <button type="button" class="login_btn_data">Inicia Sesion</button>
                                        <button type="button" class="create_login_btn">Crear</button>
                                    </div>
                                    <div class="center_home_button">
                                        <div class="home_login_btn">
                                            <i class='bx bx-chevrons-left'></i>
                                            <h3>HOME</h3>
                                            <i class='bx bx-chevrons-right' ></i>
                                        </div>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>
            </div>
    
        `;
        this.content_pag.appendChild(this.pag);
        document.querySelector('.login_btn_data').addEventListener('click',()=>{
            this.LoginAcepted();
        });

        document.querySelector('.home_login_btn').addEventListener('click',()=>{
            this.main.factory.changePage('home');
        });

        document.querySelector('.create_login_btn').addEventListener('click',()=>{
            this.main.factory.changePage('start');
        });
    }

    LoginAcepted(){
        const input_username = document.getElementById('username');
        const input_password = document.getElementById('password');

        if(input_username.value && input_password.value){ //  Si los valores tienen algun valor
            document.querySelector('.no_access_text').style.display = 'none';
            input_username.style.border = 'none';
            input_password.style.border = 'none';

            //  Llamamos al metodo POST para obtener token
            this.PostData();
            return true;
        }
        else{
            document.querySelector('.no_access_text').style.display = 'block';
            input_username.style.border = '.5px solid red';
            input_password.style.border = '.5px solid red';

        }
    }

    async PostData(){
        const data = {
            "username":document.getElementById('username').value,
            "password":document.getElementById('password').value,
        }
        //  Peticion post
        try{
            const response = await fetch(`${this.main.url}/user/login`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(data)
                });
            // Verificamos si la respuesta no es exitosa
            if(!response.ok){
                
                if(response.status == 404){
                    let text = document.querySelector('.no_access_text');
                    text.style.display = 'block';
                    text.textContent = 'Usuario no existe';
                    input_username.style.border = '.5px solid red';
                    input_password.style.border = '.5px solid red';
                    input_username.value = '';  //  Limpiamos el input
                    input_password.value = '';  //  Limpiamos el input
                }
                if(response.status == 400){
                    let text = document.querySelector('.no_access_text');
                    text.style.display = 'block';
                    text.textContent = 'Contraseña incorrecta';
                    input_password.style.border = '.5px solid red';
                    input_password.value = '';  //  Limpiamos el input
                }
                throw new Error(`Error en la solicitud | ${response.status}`);
            }
            
            //  Convertimos la respuesta a json
            const result = await response.json();

            //  Pasamos el token al front
            this.main.token = result.access_token;

            //  Verificamos y esperamos a que haya token 
            if(this.main.token){
                console.log('Obtenemos las calificaciones'); //  Retornamos la data del backend || Calificaciones ||

                // Esta funcion es asincronica y puede tardar un tiempo
                const dash = await this.getUserCalifications(this.main.token)
                // Aqui podemos poner una barra de carga para esperar el backend y luego cambiar la pagina
                if(dash){
                    this.main.factory.changePage('dashboard');
                }
                
            }

        }
        catch(error){
            console.log('Error al procesar la solicitud ', error);
        }
    }

    //  Obtenemos la peticion de calificaciones pasando el token
    async getUserCalifications(token){
        const response = await fetch(`${this.main.url}/user/dashboard/califications`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}` //   Pasamos el token en el header para autorizar endpoint tipo bearer
            } 
        });
        
        if(!response.ok){
            const message = `Ocurrio un error: ${response.statusText}`;
            throw new Error(message);
        }

        const data = await response.json(); // Transformamos el json para poder asignar y utilizar
        this.main.username = data.username;
        this.main.name = data.name;
        this.main.estructura = data.estructura;
        this.main.competencias = data.competencias;
        this.main.comportamientos = data.comportamientos;
        this.main.objetividad = data.objetividad;
        this.main.preguntas = data.preguntas;
        this.main.feedback = data.feedback;
        this.main.total = data.total;
        // Aqui podemos mejorar la entrada al dashboard
        return true;

    }
}