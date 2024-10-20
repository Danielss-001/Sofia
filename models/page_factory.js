import { Home } from "./home.js";
import { StartInterview } from "./start_interview.js";
import { Interview } from "./interview.js";
import { Evaluation } from "./evaluation.js";
import { UserCreated } from "./user_created.js";
import { BridgeInterview } from "./bridge_interview.js";
import { Login } from "./login.js";
import { NoAccepted } from "./no_accepted.js";
import { Dashboard } from "./dashboard.js";

export class PageFactory{
    constructor(main){
        this.main = main;
    }
    changePage(pag){
        switch(pag){
            case "home":
                const home = new Home(this.main);
                home.Start();
                break;
            case "start":
                const start_interview = new StartInterview(this.main);
                start_interview.Start();
                break;
            case "bridge":
                    const bridge = new BridgeInterview(this.main);
                    bridge.Start();
                    break;
            case "interview":
                const interview = new Interview(this.main);
                interview.Start();
                break;
            case "evaluation":
                const evaluation = new Evaluation(this.main);
                evaluation.Start();
                break;
            case "created":
                const created = new UserCreated(this.main);
                created.Start();
                break;
            case "login":
                const login = new Login(this.main);
                login.Start();
                break;
            case "not":
                const not = new NoAccepted(this.main);
                not.Start();
                break;
            case "dashboard":
                const dash = new Dashboard(this.main);
                dash.Start();
        }
    }
}