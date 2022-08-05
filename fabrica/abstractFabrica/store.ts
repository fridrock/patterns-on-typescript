import { ChinaFabrica } from "./fabrics/ChinaFabrica";
import { PhoneFabrica } from "./fabrics/PhoneFabrica";
import { USAFabrica } from "./fabrics/USAFabrica";
import { Iphone } from "./phones/Iphone";
import { Samsung } from "./phones/Samsung";
import {Phone} from "./phones/Phone";

export class Store{
    private fabrica:PhoneFabrica;
    constructor(location:string){
        switch (location){
            case "china":
                this.fabrica = new ChinaFabrica();
                break;
            case "usa":
                this.fabrica = new USAFabrica();
                break;
            default:
                this.fabrica = new USAFabrica();
        }
    }
    orderPhone(type:string):Phone{
        return this.createPhone(type);
    }
    private createPhone(type:string):Phone{
        switch(type){
            case 'iphone':
                return new Iphone(this.fabrica.getDisplay(), this.fabrica.getBattery());
                break;
            case 'samsung':
                return new Samsung(this.fabrica.getDisplay(), this.fabrica.getBattery())
                break;
            default:
                return new Iphone(this.fabrica.getDisplay(), this.fabrica.getBattery())
        }
    }
    
}