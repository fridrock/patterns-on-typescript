import { Battery } from "../components/Battery";
import { Display } from "../components/Display";

export abstract class PhoneFabrica{
   abstract getDisplay():Display;
   abstract getBattery():Battery;
}