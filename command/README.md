# Команда
## Проблема
*Вы повернутый на продуктивности человек и не хотите тратить ни секунды на лишние рутинные действия и задумались над покупкой программируемого пульта, который будет оптимизировать ваш рабочий процесс, открывать нужные программы, запускать компиляцию кода и тд. Вы купили пульт с программируемыми ячейками с кнопками включения и выключения. Код запуска программ уже написан, вы **захардкодили** с каждой ячейке запуск определенных программ, но потом поняли что данное расположение неудобно. А что если надо будет добавить новую операцию? Снова хардкодить. А если удалить операцию?*
## Решение
*Помочь вам может паттерн комманда, который состоит из следующих компонентов*
- получатели
- инициаторы
- команды
- клиент

**Получатели это та самая программа, которая запускает например браузер, давайте напишем ее пример.**
```typescript
//components/Browser.ts
export class Browser{
    private name:string;
    constructor(name:string = 'browser'){
        this.name = name;
    }
    public on(){
        console.log(`browser opened, browser name is ${this.name}`);
    }
    public off(){
        console.log(`browser closed, browser name is ${this.name}`);
    }
    public openDocumentation(){
        console.log('browser opened documentation');
    }
}
//components/VsCode.ts
export class VsCode{
    private name:string;
    constructor(name:string = 'VSCODE'){
        this.name = name;
    }
    public on(){
        console.log(`Vs code is opened, name is ${this.name}`);
    }
    public startProject(){
        console.log('project started in vs code');
    }
    public off(){
        console.log('Vs code is closed');
    }
}
```
*Ничего сложного, так как это псевдокод*

**Инициатор это программа которая содержит, устанавливает и вызывает команды, но для того чтобы его реализовать сначала надо описать сами команды.**
*Базовый класс команды:*
```typescript
export abstract class Command{
    abstract execute():void;
}
```
*Все что содержит это класс, это объявление абстрактного метода **execute()**.*
*Вот описание всех остальных комманд:*
```typescript
//commands/BrowserOffCommand.ts
import { Browser } from "../components/Browser";
import { Command } from "./Command";

export class BrowserOffCommand extends Command{
    private browser:Browser;
    constructor(browser:Browser){
        super();
        this.browser = browser;
    }
    execute(): void {
        this.browser.off();
    }
}
//commmands/BrowserOnCommand.ts
import { Browser } from "../components/Browser";
import { Command } from "./Command";

export class BrowserOnCommand extends Command{
    private browser:Browser;
    constructor(browser:Browser){
        super();
        this.browser = browser;
    }
    execute(): void {
        this.browser.on();
    }
}
//commands/BrowserOpenDocumentation.ts
import { Browser } from "../components/Browser";
import { Command } from "./Command";

export class BrowserOpenDocumentation extends Command{
    private browser:Browser;
    constructor(browser:Browser){
        super();
        this.browser = browser;
    }
    execute(): void {
        this.browser.openDocumentation();
    }
}
//commands/NoCommand.ts
import { Command } from "./Command";

export class NoCommand extends Command{
    execute(): void {
        //Команда которая ничего не делает
    }
}
```
*Остальные команды в репозитории не сильно отличаются, все команды содержат экземляр получателя, который используют в методе **execute()**.*

**Теперь пора описать наш инициатор, то есть пульт**
```typescript 
import { Command } from "./commands/Command";

export class Controller{
    //Массивы команд включения и выключения
    private commandsOn:Command[];
    private commandsOff:Command[];
    constructor(){
        this.commandsOn = [];
        this.commandsOff = [];
    }
    //Устанавливает на определенный слот 2 команды: команда включения и команда выключения
    setCommand(slot:number, commandOn:Command, commandOff:Command){
        this.commandsOn[slot] = commandOn;
        this.commandsOff[slot] = commandOff;
    }
    //Запускает команду включения по индексу
    executeOnCommand(slot:number){
        this.commandsOn[slot].execute();
    }
    //Запускает команду выключения по индексу
    executeOffCommand(slot:number){
        this.commandsOff[slot].execute();
    }
}
```
*Мы готовы написать клиент и протестировать наш пульт*
```typescript 
//index.ts
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
```
**Вывод**
```text
browser opened, browser name is browser
browser closed, browser name is browser
Vs code is opened, name is VSCODE      
Vs code is closed
browser opened documentation
project started in vs code
```
*А чем это отличается от простого запуска программ?*
*Правильно ничем, надо добавить возможность запускать сразу несколько команд одной командой*
**Напишем мульти команды (команды, которые запускает несколько команд)**
```typescript 
//commands/MultyOpenCommand.ts
import { Command } from "./Command"

export class MultyOpenCommand extends Command{
    //Массив команд, которые надо запустить в методе execute()
    private commands:Command[];
    constructor(commands:Command[]){
        super();
        this.commands = commands;
    }
    //Метод через forEach запускает у каждой команды метод execute()
    execute(): void {
        this.commands.forEach((command)=>{
            command.execute();
        });
    }

}
```
*MultyCloseCommand выглядит также, разница в названии, которое помогает разработчику понять, что в конструктор надо передавать команды выключения.*
**Тестируем мульти-команды**
```typescript 
//index.ts
//Объявляем мульти команды
let multyOpenCommand = new MultyOpenCommand([vscodeOn, vscodeStartProject, browserOn, browserOpenDoc]);
let multyCloseCommand = new MultyCloseCommand([vscodeOff, noCommand, browserOff, noCommand]);
controller.setCommand(4,multyOpenCommand, multyCloseCommand);
// тестируем мульти команды 

console.log('\n\n\n');
controller.executeOnCommand(4);
controller.executeOffCommand(4);
```
**Вывод**
```text
Vs code is opened, name is VSCODE
project started in vs code
browser opened, browser name is browser
browser opened documentation
Vs code is closed
browser closed, browser name is browser
```
## Итог
*Мы получили изящное решение отделения клиента от исполнительного файла. Таким образом мы инкапсулировали в командах необходимое поведение. С помощью данного паттерна мы получили гибкую архитектуру, и теперь не нужно будет переписывать код инициатора и получателя, в случае надобности изменения на клиенте.*
