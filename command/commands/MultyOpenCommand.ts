import { Command } from "./Command"

export class MultyOpenCommand extends Command{
    private commands:Command[];
    constructor(commands:Command[]){
        super();
        this.commands = commands;
    }
    execute(): void {
        this.commands.forEach((command)=>{
            command.execute();
        });
    }

}