# Наблюдатель
## Состав
Паттерн наблюдатель один из самых важных и полезных паттернов. Он состоит из двух частей:
- Объект Subject с состоянием, при изменении которого нужно оповестить всех Subscriber-ов, то есть проще говоря тех, кто подписался на изменение состояния.
- Сами Subscriber-ы, которые получают оповещение об изменении состояния.
## Когда используется?
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
        //Сработало 2 обработчика
        Today is very beautiful and nice tempereture:12
        Pressure is also nice:123
        Sun is above the town, no rain today!


        Today is awful temperature 12 , it's insane bad
        Pressure is disgusting 123
        I am so tired of sun, why there is no rain

        // После того как мы удалили позитивного обзорщика,
        // его сообщение не отразилось
        Today is awful temperature 12312312 , it's insane bad
        Pressure is disgusting 12332312
        Again this awful rain, I am so tired of this
```
Итак, вот диаграмма получившихся классов:
![First UML](/documentation/uml_second.png)
