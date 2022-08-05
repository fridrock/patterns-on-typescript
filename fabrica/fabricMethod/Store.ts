import { Phone } from "../defaultFabrica/Phone";

export abstract class Store{
    abstract orderPhone(type:string):Phone;
    abstract createPhone(type:string):Phone;
}