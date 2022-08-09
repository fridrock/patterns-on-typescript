import { Enemy, Friend } from "./NPC";

abstract class IteratorInterface{
    abstract hasNext():boolean;
    abstract next():any;
}
class EnemyIterator extends IteratorInterface{
    private position:number;
    private items:Enemy[];
    constructor(items:Enemy[]){
        super();
        this.items = items;
        this.position = 0;
    }
    hasNext(): boolean {
        if(this.items[this.position]!=null){
            return true;
        }
        return false;
    }
    next() {
        let nextItem = this.items[this.position];
        this.position+=1
        return nextItem;
    }

}
class FriendIterator extends IteratorInterface{
    
    private position:number;
    private items:Map<string,Friend>;
    private keys:string[];
    constructor(items:Map<string, Friend>){
        super();
        this.items = items;
        this.position = 0;
        this.keys = Array.from(this.items.keys());
    }
    
    hasNext(): boolean {
        if (this.keys[this.position] != undefined){
            return true;
        }
        return false;
    }
    next() {
        const nextElement = this.items.get(this.keys[this.position]);
        this.position+=1
        return nextElement;
    }
}
export{IteratorInterface, EnemyIterator, FriendIterator}