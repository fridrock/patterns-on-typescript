class Enemy{
    private name:string;
    private items:string[];
    private health:number;
    constructor(name:string, items:string[], health: number){
        this.name = name;
        this.items = items;
        this.health = health;
    }
    getName(){
        return this.name;
    }
    getItems(){
        return this.items;
    }
    getHealth(){
        return this.health;
    }
}
enum Attitude{
    BAD,
    NORMAL,
    GOOD,
    EXCELLENT
}
class Friend{
    private name:string;
    private items:string[];
    private health:number;
    private attitude:Attitude;
    constructor(name:string, items:string[], health:number, attitude:Attitude){
        this.name = name;
        this.items = items;
        this.health = health;
        this.attitude = attitude
    }
    getName(){
        return this.name;
    }
    getItems(){
        return this.items;
    }
    getHealth(){
        return this.health;
    }
    getAttitude(){
        return this.attitude;
    }
}
export {Enemy, Friend,Attitude}