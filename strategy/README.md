# Стратегия

 *Паттерн стратегия определяет семейство алгоритмов, инкапсулирует каждый из них и обеспечивает их взаимозаменяемость. Он позволяет модифицировать алгоритмы независимо от их использования на стороне клиента.*

 Для реализации этого паттерна необходимо определить:
 - Супер класс, содержащий реализацию абстракции отвечающей за поведение.
 - Абстракции отвечающие за поведение.
 - Реализация абстракции, отвечающей за поведение.
 - Реализация суперкласса, которая содержит только ей присущие реализации поведения.
 
 _**Таким образом намного легче расширять функционал уже созданного суперкласса**._

 Перейдем к реализации паттерна.
 Итак у нас есть задача, есть супер класс **Duck**, он реализует 2 метода это **fly** и **quack**. Допустим нам надо добавить утку которая не квакает, нам прийдется переписывать реализацию метода **quack**, а что если потом она научится это делать? Как заставить ее динамически поменять свое поведение, реализацию метода **quack**? Тут в игру вступает *Паттерн стратегия*.
 - Для начала создадим два интерфейса, которые будут реализовывать методы **quack** и **fly**.
 ```typescript
interface FlyBehaviour{
    fly():void;
}
interface QuakBehaviour{
    quack():void;
}
 ```
Ничего сложного, просто два интерфейса, описывающие методы.
- Теперь опишем различные реализации этих двух интерфейсов
```typescript
class MuteQuack implements QuakBehaviour{
    quack(): void {
        console.log('this duck is not quacking');
        //Не квакает
    }
}
class RoarQuack implements QuakBehaviour{
    quack(): void {
        console.log('QUACK QUACK');
        //Громко квакает
    }
}
class NoFly implements FlyBehaviour{
    fly(): void {
        console.log('this duck is not flying');
        //Не летает
    }
}
class FastFly implements FlyBehaviour{
    fly(): void {
        console.log('fast fly fast fly')
        //быстро летает
    }
}
```
Мы реализовали самые различные поведения утки, теперь пока написать саму утку
- Родительский "Супер" класс **Duck**
```typescript
class Duck{
    //Две переменные содержащие реализацию поведения
    flyBehaviour:FlyBehaviour;
    quackBehaviour:QuakBehaviour;
    //обычный конструктор
    constructor( quackBehaviour:QuakBehaviour,flyBehaviour:FlyBehaviour){
        this.flyBehaviour = flyBehaviour;
        this.quackBehaviour = quackBehaviour
    }
    // Этот метод не описывает поведение, а лишь вызывает
    // его реализацию из переменных 
    performQuack(){
        this.quackBehaviour.quack();
    }
    performFly(){
        this.flyBehaviour.fly();
    }
}
```
Отлично, мы описали "супер" класс который:
- Содержит 2 переменные содержащие реализацию интерфейсов поведения
- Присваивает значения этим переменным через конструктор
- Запускает реализацию метода **quack** и **fly** из **quackBehaviour** и **flyBehaviour** с помощью методов **performFly** и **performQuack.**

Теперь осталось лишь написать реализацию некоторых уток

```typescript 
class DefaultDuck extends Duck{
    constructor(quackBehaviour:QuakBehaviour, flyBehaviour:FlyBehaviour){
        super(quackBehaviour,flyBehaviour)
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

```
Обратите внимание: *WoodenDuck с помощью метода setFlyBehaviour может поменять свое поведение связанное с полетом.*
**Протестируем**:
```typescript
let woody:WoodenDuck = new WoodenDuck(new MuteQuack(),new NoFly());
woody.performFly();
woody.setFlyBehaviour(new FastFly());
woody.performFly();
```
**Вывод:**
```text
this duck is not flying
//После того как выполнили woody.setFlyBehaviour(new FastFly());
fast fly fast fly
```
Итак, вот диаграмма получившихся классов:

![First UML](/documentation/uml_first.png)
