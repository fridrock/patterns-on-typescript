import { AmericanPhoneStore } from "./AmericanPhoneStore";
import { ChinaPhoneStore } from "./ChinaPhoneStore";
import {Phone} from './phones/Phone';
//Заказываем телефоны в Китае
let phoneStore = new ChinaPhoneStore();
let iphone:Phone = phoneStore.orderPhone('iphone')
console.log(iphone.getDescription());
let samsung:Phone = phoneStore.orderPhone('samsung');
console.log(samsung.getDescription());
// Заказываем телефоны в США
phoneStore = new AmericanPhoneStore();
iphone = phoneStore.orderPhone('iphone');
samsung = phoneStore.orderPhone('samsung');
console.log(iphone.getDescription());
console.log(samsung.getDescription());