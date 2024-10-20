export class IDash{
    constructor(main,dashboard){
        this.content_dash = document.querySelector('.user_module_container');
        this.pag_dash = document.createElement('div');
        this.pag_dash.className = 'modules_container';
        this.main = main;
        this.dashboard = dashboard;
    }

    clearContent(){
        if(this.content_dash){
            this.content_dash.innerHTML = " "; // Limpiamos el dashboard del contenedor 
        }
    }

    Start(){}   //  Invocamos contenedor
}