import { Phone } from "./Phone";

export class Samsung extends Phone{
    name:string;
    constructor(){
        super();
        this.name = 'Samsung';
    }
    getDescription(): string {
       return `This phone is: ${this.name}`;
    }
}