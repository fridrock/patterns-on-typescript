import { Phone } from "./Phone";

export class SamsungUSA extends Phone{
    name:string;
    constructor(){
        super();
        this.name = 'Samsung';
    }
    getDescription(): string {
       return `This phone is: ${this.name} made in USA`;
    }
}