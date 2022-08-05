import { Phone } from "./Phone";

export class Iphone extends Phone{
    name:string;
    constructor(){
        super();
        this.name = 'Iphone';
    }
    getDescription(): string {
        return `This phone is: ${this.name}`;
    }
}