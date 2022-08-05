export class SingleTon{
    private static instance:SingleTon;
    private value:number;
    private constructor(){
        this.value = Math.random();
    }
    public static getInstance(){
        if(this.instance === undefined){
            this.instance = new SingleTon();
        }
        return this.instance;
    }
    public getValue(){
        return this.value;
    }
}