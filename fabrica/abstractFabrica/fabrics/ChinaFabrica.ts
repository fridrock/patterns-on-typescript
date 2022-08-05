import { CHINADisplay } from "../components/CHINADisplay";
import { PhoneFabrica } from "./PhoneFabrica";
import {CHINABattery} from "../components/CHINABattery";
import { Display } from "../components/Display";
import { Battery } from "../components/Battery";
export class ChinaFabrica extends PhoneFabrica{
    getDisplay(): Display {
        return new CHINADisplay();
    }
    getBattery(): Battery {
        return new CHINABattery();
    }

}