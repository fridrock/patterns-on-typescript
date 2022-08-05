import { Store } from "./store";

let chinaStore = new Store('china');
console.log(chinaStore.orderPhone('iphone').getDescription());
console.log(chinaStore.orderPhone('samsung').getDescription());
let americanStore =  new Store('usa');
console.log(americanStore.orderPhone('iphone').getDescription());
console.log(americanStore.orderPhone('samsung').getDescription());


