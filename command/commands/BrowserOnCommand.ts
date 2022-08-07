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