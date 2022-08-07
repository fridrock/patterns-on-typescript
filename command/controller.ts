import { Command } from "./commands/Command";

export class Controller{
    private commandsOn:Command[];
    private commandsOff:Command[];
    constructor(){
        this.commandsOn = [];
        this.commandsOff = [];
    }
    setCommand(slot:number, commandOn:Command, commandOff:Command){
        this.commandsOn[slot] = commandOn;
        this.commandsOff[slot] = commandOff;
    }
    executeOnCommand(slot:number){
        this.commandsOn[slot].execute();
    }
    executeOffCommand(slot:number){
        this.commandsOff[slot].execute();
    }
}