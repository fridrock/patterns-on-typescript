# Паттерны проектирования
## Паттерны затронутые в этой шпаргалке:
- [Стратегия](#стратегия)
- [Наблюдатель](#наблюдатель)

### Стратегия

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


### Наблюдатель
#### Состав
Паттерн наблюдатель один из самых важных и полезных паттернов. Он состоит из двух частей:
- Объект Subject с состоянием, при изменении которого нужно оповестить всех Subscriber-ов, то есть проще говоря тех, кто подписался на изменение состояния.
- Сами Subscriber-ы, которые получают оповещение об изменении состояния.
#### Когда используется?
*Чем помогает паттерн Наблюдатель?*
Допустим у вас есть объект который просто хранит в себе переменную с цветом, и вам нужно при изменении этого цвета вывести его значение в консоль, отправить это значение на сервер и покрасить задний фон в этот цвет. *Конечно можно захардкодить это*, но есть решение лучше. Сделать из объекта с цветом Subject, а в различных Subscriber-ах прописать что делать с этим цветом. Так если потребуется добавить еще какую-либо операцию, исполняемую при изменении цвета, достаточно будет просто написать нового Subscriber-a.
#### Реализация
Нам нужно сделать погодную станцию, в которую с легкостью можно добавить "обозревателей погоды", а если человеческим языком то наблюдателей которые будут по разному описывать изменение в погоде. Нам также необходимо добавить функционал добавления и удаления Subscriber-ов.

- Для начала опишем базовые интерфейсы: Subject и Subscriber.

```typescript 
// интерфейс наблюдателя

interface Subscriber{
    // поле name понадобится для отбора наблюдателей в будущем
    name:string;
    // этот метод будет вызываться при изменении состояния
    update(state:WeatherState):void;
}


//интерфейс субъекта
interface Subject{
    //массив наблюдателей
    subscribers:(Subscriber)[];
    registerUser(subscriber:Subscriber):void;
    removeUser(subscriber:Subscriber):void;
    //функция, оповещающая наблюдателей
    notifyUsers():void;
}

```

*Отлично, мы написали базовые интерфейсы, теперь перейдем к следующему шагу.*

- Реализация субъекта(WeatherStation).
```typescript
//Специальный тип состояния 
type WeatherState = {
    degree:number;
    pressure:number;
    isRain:boolean;
}



//реализация интерфеса Subject
class WeatherStation implements Subject{
    subscribers:(Subscriber)[] = [];
    private state:WeatherState = {}! as WeatherState;
    public registerUser(user:Subscriber):void{
        this.subscribers.push(user);
    }
    // Удаление пользователя по имени
    public removeUser(user:Subscriber):void{
        this.subscribers = this.subscribers.filter((elem)=>elem.name!=user.name);
    }

    notifyUsers(){
        //Для каждого наблюдателя вызывается метод update()
        this.subscribers.forEach((user)=>user.update(this.getState()))
    }
    public setState(state:WeatherState):void{
        this.state = state;
        /* Когда меняется состояние мы вызываем функцию 
        notifyUsers(), которая оповещает наблюдателей*/
        this.notifyUsers();
    }
    public getState():WeatherState{
        return this.state;
    }
}
```
*Итак у нас есть станция, которая добавляет к себе наблюдателей, обладает состоянием и оповещает наблюдателей при его изменении.*

- Реализация самих наблюдателей
```typescript
//Позитивный обзорщик
class NiceWidget implements Subscriber {
    name:string;
    constructor(name:string){
        this.name = name;
    }
    update(state: WeatherState): void {
        console.log(`
        Today is very beautiful and nice tempereture:${state.degree}
        Pressure is also nice:${state.pressure}
        ${state.isRain?`It's very nice that it is raining`: 'Sun is above the town, no rain today!'}
        `)
    }
}


//Пессимистичный обзорщик
class AwfulWidget implements Subscriber{
    name: string;
    constructor(name:string){
        this.name = name;
    }
    update(state: WeatherState): void {
        console.log(`
        Today is awful temperature ${state.degree} , it's insane bad
        Pressure is disgusting ${state.pressure}
        ${state.isRain?`Again this awful rain, I am so tired of this`:`I am so tired of sun, why there is no rain`}
        `)
    }
}
```
*В каждом обзорщике своя реализация метода update(), поэтому они по разному реагируют на изменение состояния.*
- Тестируем 
```typescript
let station:WeatherStation = new WeatherStation();
let niceWidget:NiceWidget = new NiceWidget('nice_widget');
let awfulWidget:AwfulWidget = new AwfulWidget('awful_widget');


//register subscribers and check the observer functionality
station.registerUser(niceWidget);
station.registerUser(awfulWidget);
station.setState({
    pressure:123,
    degree:12,
    isRain:false
});
station.removeUser(niceWidget);
station.setState({
    pressure:12332312,
    degree:12312312,
    isRain:true
})
```
Вывод:
```text

```