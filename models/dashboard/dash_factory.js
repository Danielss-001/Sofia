import { Dash } from "./dash.js";
import { Structure } from "./structura.js";
import { Competencia } from "./competencias.js";
import { Comportamientos } from "./comportamientos.js"; 
import { Objetividad } from "./objetividad.js";
import { Preguntas } from "./preguntas.js";
import { Feedback } from "./feedback.js";
import { Test } from "./test.js";
import { Out } from "./out_session.js";

export class FactoryDash{
    constructor(main,dashboard){
        this.main = main;
        this.dashboard = dashboard;
    }

    changeDash(menu){
        switch(menu){
            case "dash":
                const dash = new Dash(this.main, this.dashboard); 
                dash.Start();
                break;
            case "structure":
                const struct = new Structure(this.main,this.dashboard);
                struct.Start();
                break;
            case "competencias":
                const comp = new Competencia(this.main,this.dashboard);
                comp.Start();
                break;
            case "comportamientos":
                const comporta = new Comportamientos(this.main,this.dashboard);
                comporta.Start();
                break;
            case "objetividad":
                const objetividad = new Objetividad(this.main,this.dashboard);
                objetividad.Start();
                break;
            case "preguntas":
                const preguntas = new Preguntas(this.main,this.dashboard);
                preguntas.Start();
                break;
            case "feedback":
                const feedback = new Feedback(this.main,this.dashboard);
                feedback.Start();
                break;
            case "test":
                const total = new Test(this.main,this.dashboard);
                total.Start();
                break;
            case "out":
                const out = new Out(this.main,this.dashboard);
                out.Start();
                break;

        }

    }
}