import { IphoneUSA } from "../phones/IphoneUSA";
import { SamsungUSA } from "../phones/SamsungUSA";


export class AmericanFabrica{
    createPhone(type:String){
        if (type=='iphone'){
            return new IphoneUSA();
        }else if(type==='samsung'){
            return new SamsungUSA();
        }else{
            return new IphoneUSA();
        }
    }
}