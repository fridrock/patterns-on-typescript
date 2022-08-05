import { SingleTon } from "./SingleTon";

let first_object = SingleTon.getInstance();
console.log(first_object.getValue());
let second_object = SingleTon.getInstance();
console.log(second_object.getValue());
