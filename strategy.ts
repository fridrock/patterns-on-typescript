interface FlyBehaviour{
    fly():void;
}
interface QuakBehaviour{
    quack():void;
}
class Duck{
    flyBehaviour:FlyBehaviour;
    quackBehaviour:QuakBehaviour;
    constructor( quackBehaviour:QuakBehaviour,flyBehaviour:FlyBehaviour){
        this.flyBehaviour = flyBehaviour;
        this.quackBehaviour = quackBehaviour
    }
    performQuack(){
        this.quackBehaviour.quack();
    }
    performFly(){
        this.flyBehaviour.fly();
    }
}
class MuteQuack implements QuakBehaviour{
    quack(): void {
        console.log('this duck is not quacking');
    }
}
class DefaultQuack implements QuakBehaviour{
    quack(): void {
        console.log('quack quack');
    }
}
class RoarQuack implements QuakBehaviour{
    quack(): void {
        console.log('QUACK QUACK'); 
    }
}
class NoFly implements FlyBehaviour{
    fly(): void {
        console.log('this duck is not flying');
    }
}
class DefaultFly implements FlyBehaviour{
    fly(): void {
        console.log('fly fly')
    }
}
class FastFly implements FlyBehaviour{
    fly(): void {
        console.log('fast fly fast fly')
    }
}
class WoodenDuck extends Duck{
    constructor(quackBehaviour:QuakBehaviour, flyBehaviour:FlyBehaviour){
        super(quackBehaviour,flyBehaviour)
    }
    setFlyBehaviour(flyBehaviour:FlyBehaviour){
        this.flyBehaviour = flyBehaviour;
    }
}
class DefaultDuck extends Duck{
    constructor(quackBehaviour:QuakBehaviour, flyBehaviour:FlyBehaviour){
        super(quackBehaviour,flyBehaviour)
    }
}
let woody:WoodenDuck = new WoodenDuck(new MuteQuack(),new NoFly());
woody.performQuack();
woody.performFly();
woody.setFlyBehaviour(new FastFly());
woody.performFly();
let defaultDuck:DefaultDuck = new DefaultDuck(new DefaultQuack(), new DefaultFly());
defaultDuck.performFly();
defaultDuck.performQuack();