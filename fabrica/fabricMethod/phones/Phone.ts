export abstract class Phone{
    abstract name:string;
    abstract getDescription():string;
    box():void{
        console.log('phone is boxed');
    }
}