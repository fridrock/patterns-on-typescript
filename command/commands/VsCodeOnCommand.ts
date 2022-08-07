import { VsCode } from "../components/VsCode";
import { Command } from "./Command";

export class VsCodeOnCommand extends Command{
    private vscode:VsCode;
    constructor(vscode:VsCode){
        super();
        this.vscode = vscode;
    }
    execute(): void {
        this.vscode.on();
    }
}