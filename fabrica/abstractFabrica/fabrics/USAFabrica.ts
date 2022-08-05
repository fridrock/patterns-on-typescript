import { USADisplay } from "../components/USADisplay";
import { PhoneFabrica } from "./PhoneFabrica";
import {USABattery} from "../components/USABattery";
import { Display } from "../components/Display";
import { Battery } from "../components/Battery";
export class USAFabrica extends PhoneFabrica{
    getDisplay(): Display {
        return new USADisplay();
    }
    getBattery(): Battery {
        return new USABattery();
    }

}