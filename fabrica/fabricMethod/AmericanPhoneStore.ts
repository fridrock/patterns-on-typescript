import { Phone } from "./phones/Phone";
import { AmericanFabrica } from "./fabrics/AmericanFabrica";
import { Store } from "./Store";

export class AmericanPhoneStore extends Store{
    fabrica:AmericanFabrica = new AmericanFabrica();
    orderPhone(type: string): Phone {
        let phone = this.createPhone(type);
        phone.box();
        return phone;
    }
    createPhone(type: string): Phone {
        return this.fabrica.createPhone(type);
    }
    
}