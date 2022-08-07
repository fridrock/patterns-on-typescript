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