import { Phone } from "./phones/Phone";
import { ChinaFabrica } from "./fabrics/ChinaFabrica";
import { Store } from "./Store";

export class ChinaPhoneStore extends Store{
    fabrica:ChinaFabrica = new ChinaFabrica();
    orderPhone(type: string): Phone {
        let phone = this.createPhone(type);
        phone.box();
        return phone;
    }
    createPhone(type: string): Phone {
        return this.fabrica.createPhone(type);
    }
    
}