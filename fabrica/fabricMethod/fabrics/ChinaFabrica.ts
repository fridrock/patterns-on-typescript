import { IphoneCHINA } from "../phones/IphoneCHINA";
import { SamsungCHINA } from "../phones/SamsungCHINA";

export class ChinaFabrica{
    createPhone(type:String){
        if (type=='iphone'){
            return new IphoneCHINA();
        }else if(type==='samsung'){
            return new SamsungCHINA();
        }else{
            return new IphoneCHINA();
        }
    }
}