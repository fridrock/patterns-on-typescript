import { Phone } from "./Phone";

export class IphoneUSA extends Phone{
    name:string;
    constructor(){
        super();
        this.name = 'Iphone';
    }
    getDescription(): string {
        return `This phone is: ${this.name} made in USA`;
    }
}