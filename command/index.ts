import { BrowserOffCommand } from "./commands/BrowserOffCommand";
import { BrowserOnCommand } from "./commands/BrowserOnCommand";
import { BrowserOpenDocumentation } from "./commands/BrowserOpenDocumenantation";
import { Browser } from "./components/Browser";
import { Controller } from "./controller";
import { NoCommand } from "./commands/NoCommand";
import { VsCodeOnCommand } from "./commands/VsCodeOnCommand";
import { VsCode } from "./components/VsCode";
import { VsCodeOffCommand } from "./commands/VsCodeOffCommand";
import { VsCodeStartProjectCommand } from "./commands/VsCodeStartProjectCommand";
import { MultyCloseCommand } from "./commands/MultyCloseCommand";
import { MultyOpenCommand } from "./commands/MultyOpenCommand";
//Объявляем контроллер
let controller = new Controller();

//Объявляем получателей
let browser = new Browser();
let vscode = new VsCode();

//Объявляем команды
let noCommand = new NoCommand();
let [browserOn, browserOff, browserOpenDoc] = 
[new BrowserOnCommand(browser), 
    new BrowserOffCommand(browser), 
        new BrowserOpenDocumentation(browser)];
let [vscodeOn, vscodeOff, vscodeStartProject] = 
[new VsCodeOnCommand(vscode),
    new VsCodeOffCommand(vscode),
        new VsCodeStartProjectCommand(vscode)];
//Устанавливаем определенные команды определенным слотам на контроллере
controller.setCommand(0, browserOn, browserOff);
controller.setCommand(1, vscodeOn, vscodeOff);
controller.setCommand(2, browserOpenDoc, noCommand);
controller.setCommand(3, vscodeStartProject, noCommand);
//тестируем простые команды
controller.executeOnCommand(0);
controller.executeOffCommand(0);
controller.executeOnCommand(1);
controller.executeOffCommand(1);
controller.executeOnCommand(2);
controller.executeOffCommand(2);
controller.executeOnCommand(3);
controller.executeOffCommand(3);
//Объявляем мульти команды
let multyOpenCommand = new MultyOpenCommand([vscodeOn, vscodeStartProject, browserOn, browserOpenDoc]);
let multyCloseCommand = new MultyCloseCommand([vscodeOff, noCommand, browserOff, noCommand]);
controller.setCommand(4,multyOpenCommand, multyCloseCommand);
// тестируем мульти команды 

console.log('\n\n\n');
controller.executeOnCommand(4);
controller.executeOffCommand(4);