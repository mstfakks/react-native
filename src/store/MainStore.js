import { observable, action, computed, makeObservable, autorun, reaction } from "mobx"; 
class MainStore
{
    @observable name = 'y_kisi';

    constructor(){
        makeObservable(this);
        reaction(()=> this.name, name=> {
            if(name == 'x_kisi'){
                alert('İsim x_kisi oldu bırakabilirsin'); 
            }

        })
    }

    @action getName(){
        return this.name;
    }

    @action setName(name){ 
        this.name = name;  
    }
}

export default new MainStore();