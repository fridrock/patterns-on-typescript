import { Battery } from "./Battery";

export class USABattery extends Battery{
    cost: number;
    constructor(){
        super();
        this.cost = 25;
    }
}