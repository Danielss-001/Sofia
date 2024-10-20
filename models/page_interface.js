export class IPag{
    constructor(main){
        this.content_pag = document.querySelector('.content_pag'); 
        this.pag = document.createElement('div');
        this.pag.className = 'model_page';
        this.main = main;
    }
    // Limpiamos el contenedor que aloja la pagina
    clearContent() {
        if (this.content_pag) {
            this.content_pag.innerHTML = "";  // Limpia el contenido del contenedor
        }
    }
    Start(){

    }
}