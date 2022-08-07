import { VsCode } from "../components/VsCode";
import { Command } from "./Command";

export class VsCodeOffCommand extends Command{
    private vscode:VsCode;
    constructor(vscode:VsCode){
        super();
        this.vscode = vscode;
    }
    execute(): void {
        this.vscode.off();
    }
}