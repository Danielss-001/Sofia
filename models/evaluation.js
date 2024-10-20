import { IPag } from "./page_interface.js";

export class Evaluation extends IPag{
    Start(){
        this.clearContent();
        this.pag.innerHTML = `
            <div class="start_evaluation_container">
                    <div class="evaluation_container">
                        <div class="container_data_user">
                            <div class="separate_text">
                                <h2>Entrevista Finalizada</h2>
                                <p>Estas son tus calificaciones.</p>
                                <p>¡Crea un usuario y mejora!</p>
                            </div>
                            <form class="form_create">
                                <div class="input_create">
                                    <input type="text" placeholder="Nombre de Usuario" class="input_control_c">
                                </div>
                                <div class="input_create">
                                    <input type="password" id ="input_control" placeholder="Contraseña" class="input_control_c">
                                </div>
                            </form>
                            <button class="create_btn">Crear</button>
                            <i class='bx bx-chevrons-left evaluation' ></i>
                        </div>
                        <div class="califications">
                            <div class="nota final"><h3 id="total">${this.main.total}</h3><h5>| Total</h5></div>
                            <div class="nota"><h3 id="estructura">${this.main.estructura}</h3><h5>| Estructura</h5></div>
                            <div class="nota"><h3 id="competencias">${this.main.competencias}</h3><h5>| Competencias</h5></div>
                            <div class="nota"><h3 id="comportamientos">${this.main.comportamientos}</h3><h5>| Comportamiento</h5></div>
                            <div class="nota"><h3 id="objetividad">${this.main.objetividad}</h3><h5>| Objetividad</h5></div>
                            <div class="nota"><h3 id="preguntas">${this.main.preguntas}</h3><h5>| Preguntas</h5></div>
                            <div class="nota"><h3 id="feedback">${this.main.feedback}</h3><h5>| Feedback</h5></div>
                        </div>
                    </div>
            </div>
        
        `;
        this.content_pag.appendChild(this.pag);
        this.getNotes();
        document.querySelector('.bx.bx-chevrons-left').addEventListener('click',()=>{    //  Boton de start interview
            this.main.factory.changePage('start');
        });
        
        const username = document.querySelector('.input_control_c');
        const password = document.getElementById('input_control');
        
    
        
        document.querySelector('.create_btn').addEventListener('click',()=>{
            if(username.value && password.value){
                //  Creamos el usuario en el backend justo aqui  //
                this.CreatedUser(username.value,password.value);    //   Creamos el usuario en el backend
                //
                this.main.factory.changePage('created');
            
            }else{
                username.style.border = '1px solid red';
                password.style.border = '1px solid red';
                alert("Ingresa datos validos");
            }
        });
    }
    //  Creamos el usuario en este metodo //
    async CreatedUser(username,password){
        const data = {
            "username": username,
            "password": password,
            "name": this.main.name,
            "perfil": this.main.perfil,
            "user_id": 0,
            "estructura": this.main.estructura,
            "competencias": this.main.competencias,
            "comportamientos": this.main.comportamientos,
            "objetividad": this.main.objetividad,
            "preguntas": this.main.preguntas,
            "feedback": this.main.feedback,
            "total": this.main.total
        }
        try{
            const response = await fetch(`${this.main.url}/interview/signup`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            //  Verificamos si la respuesta es exisota
            if(!response.ok){
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            //  Pasamos la respuesta a json para mostrar en consola
            const result = await response.json();
            console.log(`Respuesta del servidor ${result}`);    //  Mostrar en consola la respuesta
        }
        catch (error){
            console.log('Error en la solicitud ',error);
        }
        //
        //
        //

    }

    //  Obtenemos las calificaciones del usuario
    async getNotes(){
        try{
            const response = await fetch(`${this.main.url}/interview/finish/`); //  Obtenemos datos del backend para obtener las notas 
            if(response.ok){
                const data = await response.json();
                console.log(data); //   mostramos el json 
                //  Aqui se obtienen y pasan los datos al front para mostrarlos y poder re-asignarlos 
                this.main.estructura = data.estructura;
                this.main.competencias = data.competencias;
                this.main.comportamientos = data.comportamientos;
                this.main.objetividad = data.objetividad;
                this.main.preguntas = data.preguntas;
                this.main.feedback = data.feedback;
                
                const sum_notes = data.estructura + data.competencias + data.comportamientos + data.objetividad + data.preguntas + data.feedback;
                
                const total = sum_notes / 6;
                this.main.total = parseFloat(total.toFixed(1));

                //  Actualizamos el frontend
                this.updateCalifications();

            }
            else{
                console.log('Error al comunicarse con el backend');
            }
        }
        catch (error){
            console.log('Error al comunicarse con backend' + error)
        }
    }
    //   Aqui pasamos los datos al frontend
    updateCalifications(){
    
        document.getElementById('estructura').textContent = this.main.estructura;
        document.getElementById('competencias').textContent = this.main.competencias;
        document.getElementById('comportamientos').textContent = this.main.comportamientos;
        document.getElementById('objetividad').textContent = this.main.objetividad;
        document.getElementById('preguntas').textContent = this.main.preguntas;
        document.getElementById('feedback').textContent = this.main.feedback;
        document.getElementById('total').textContent = this.main.total;
    }
}