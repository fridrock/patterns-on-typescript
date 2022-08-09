import { EnemyIterator, FriendIterator, IteratorInterface } from "./iterators";
import { Attitude, Enemy, Friend } from "./NPC"
abstract class Collection{
    abstract createIterator():IteratorInterface;
}
class EnemyCollection extends Collection{
    private enemies:Enemy[] = []
    constructor(){
        super();
        this.enemies.push(new Enemy('Lord',['sword','heal'],100));
        this.enemies.push(new Enemy('Goblin',['bow-and-arrow','money'],50));
        this.enemies.push(new Enemy('Golem',['stone'],400));
    }
    createIterator(): IteratorInterface {
        return new EnemyIterator(this.enemies);
    }
}
class FriendCollection extends Collection{
    private friends:Map<string,Friend>;
    constructor(){
        super();
        this.friends = new Map();
        let friend1 = new Friend('King',['throne','sword'],500, Attitude.GOOD);
        let friend2 = new Friend('Queen',['subthrone','army'],300, Attitude.BAD);
        this.friends.set(friend1.getName(), friend1);
        this.friends.set(friend2.getName(), friend2);
    }
    createIterator(): IteratorInterface {
        return new FriendIterator(this.friends);
    }

}
export {Collection, EnemyCollection, FriendCollection}