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