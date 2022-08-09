import { Collection, EnemyCollection, FriendCollection } from "./collections";
import { IteratorInterface } from "./iterators";

class NPCLogger{
    private collections:Collection[];
    constructor(){
        this.collections = [];
        this.collections.push(new EnemyCollection());
        this.collections.push(new FriendCollection())
    }
    printNPC(){
        this.collections.forEach((collection)=>{
            this.printCollection(collection);
        })
    }
    private printCollection(collection:Collection){
        const iterator:IteratorInterface = collection.createIterator();
        while(iterator.hasNext()){
            const next = iterator.next();
            console.log(`name is:${next.getName()} \nitems:${next.getItems()}\nhealth:${next.getHealth()}`
            )
            try{
                if (next.getAttitude()!= undefined){
                console.log(
                `Attitude:${next.getAttitude()}`);
            }
            }catch(e:any){

            }
            console.log('\n\n\n')
            
        }
    }
}
export {NPCLogger}