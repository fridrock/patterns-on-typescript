import { Iphone } from "./Iphone";
import { Phone } from "./Phone";
import { Samsung } from "./Samsung";

//Плохой пример
// class PhoneStore{
//     orderPhone(type:string):Phone{
//         let phone:Phone =  this.createPhone(type);
//         return phone;
//     }
//     private createPhone(type:string):Phone{
//         if(type==='iphone'){
//             return new Iphone();
//         }
//         else if (type==='samsung'){
//             return new Samsung();
//         }else{
//             return new Iphone();
//         }
//     }
// }
// const store:PhoneStore = new PhoneStore();
// let iphone = store.orderPhone('iphone');
// let samsung = store.orderPhone('samsung');
// console.log(iphone.getDescription());
// console.log(samsung.getDescription());
class PhoneFabrica{
    createPhone(type:string):Phone{
        if(type==='iphone'){
            return new Iphone();
        }
        else if (type==='samsung'){
            return new Samsung();
        }else{
            return new Iphone();
        }
    }
}
class UpgratedPhoneStore{
    orderPhone(type:string):Phone{
        let phone:Phone =  this.createPhone(type);
        return phone;
    }
    private createPhone(type:string):Phone{
        let fabrica = new PhoneFabrica();
        return fabrica.createPhone(type);
    }
}
const newStore:UpgratedPhoneStore = new UpgratedPhoneStore();
let iphone = newStore.orderPhone('iphone');
let samsung = newStore.orderPhone('samsung');
console.log(iphone.getDescription());
console.log(samsung.getDescription());