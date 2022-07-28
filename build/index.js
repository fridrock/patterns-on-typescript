"use strict";
class Duck {
    constructor(quackBehaviour, flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
        this.quackBehaviour = quackBehaviour;
    }
    performQuack() {
        this.quackBehaviour.quack();
    }
    performFly() {
        this.flyBehaviour.fly();
    }
}
class MuteQuack {
    quack() {
        console.log('this duck is not quacking');
    }
}
class DefaultQuack {
    quack() {
        console.log('quack quack');
    }
}
class RoarQuack {
    quack() {
        console.log('QUACK QUACK');
    }
}
class NoFly {
    fly() {
        console.log('this duck is not flying');
    }
}
class DefaultFly {
    fly() {
        console.log('fly fly');
    }
}
class FastFly {
    fly() {
        console.log('fast fly fast fly');
    }
}
class WoodenDuck extends Duck {
    constructor(quackBehaviour, flyBehaviour) {
        super(quackBehaviour, flyBehaviour);
    }
    setFlyBehaviour(flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    }
}
class DefaultDuck extends Duck {
    constructor(quackBehaviour, flyBehaviour) {
        super(quackBehaviour, flyBehaviour);
    }
}
let woody = new WoodenDuck(new MuteQuack(), new NoFly());
woody.performQuack();
woody.performFly();
woody.setFlyBehaviour(new FastFly());
woody.performFly();
let defaultDuck = new DefaultDuck(new DefaultQuack(), new DefaultFly());
defaultDuck.performFly();
defaultDuck.performQuack();
