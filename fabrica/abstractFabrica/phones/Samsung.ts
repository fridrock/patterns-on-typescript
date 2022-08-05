import { Battery } from "../components/Battery";
import { Display } from "../components/Display";
import {Phone} from "./Phone";
export class Samsung extends Phone{
    private display:Display;
    private battery:Battery;
    constructor(display:Display, battery:Battery){
        super();
        this.display = display;
        this.battery = battery;
    }
    getCost(): number {
        return this.display.cost+this.battery.cost;
    }
    getDescription(): string {
        return `this is samsung that cost ${this.getCost()}`;
    }
}