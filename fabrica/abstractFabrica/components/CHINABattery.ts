import { Battery } from "./Battery";

export class CHINABattery extends Battery{
    cost: number;
    constructor(){
        super();
        this.cost = 15;
    }
}