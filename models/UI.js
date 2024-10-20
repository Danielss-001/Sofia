export class UI{
    constructor(main){
        this.main = main;
        this.menu = document.querySelector('.bx.bx-menu');
        this.user_login = document.querySelector('.user_btn');
        this.home_btn = document.querySelector('.home_btn');
    }

    Start(){
        this.menu.addEventListener('click',()=>{
            document.querySelector('.ul_menu').classList.toggle('show');
        });

        this.home_btn.addEventListener('click',()=>{
            this.main.factory.changePage('home');
        });

        this.user_login.addEventListener('click',()=>{
            if(!this.main.token){
                this.main.factory.changePage('login');
            }
            else{
                this.main.factory.changePage('dashboard');
            }
        });

        
    }
}