# Адаптер
## Проблема
*Вы начинающая соцсеть, вы выкатили первую версию своего приложения и пользователи в восторге, пора добавлять новый функционал. У вас имеется интерфейс сообщения, пока что сообщение может только помещать в себе строку, а пользователи требуют числа. Также время отправки у вас записывалось в строчку, а сейчас вы поняли что было бы практичнее использовать для этого объект **Date**.*
```typescript
//Messages.ts
//Вот старый формат сообщений, которые хранятся у вас в базе данных
export abstract class OldMessage{
    abstract text:string;
    abstract time:string;
    abstract from:number;
    abstract to:number;
    abstract getText():string;
    abstract getTime():string;
    abstract getFrom():number;
    abstract getTo():number;
}
//Вот его единственная реализация
export class DefaultMessage extends OldMessage{
    text: string;
    time: string;
    from: number;
    to: number;
    constructor(text:string, time:string, from:number, to:number){
        super();
        this.text = text;
        this.time = time;
        this.from = from;
        this.to = to;
    }
    getText(): string {
        return this.text;
    }
    getTime(): string {
        return this.time;
    }
    getFrom(): number {
        return this.from;
    }
    getTo(): number {
        return this.to;
    }
}
// А вот новый интерфейс сообщения, который вы хотите внедрить
export abstract class Message{
    abstract value:string|number;
    abstract timestamp:Date;
    abstract from:number;
    abstract to:number;
    abstract getValue():string|number;
    abstract getTimeStamp():Date;
    abstract getFrom():number;
    abstract getTo():number;
}
// И вот его реализация
export class NumberMessage extends Message{
    value: string | number;
    timestamp: Date;
    from: number;
    to: number;
    constructor(value:number, timestamp:Date, from:number, to:number){
        super();
        this.value = value;
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
    }
    getValue(): string | number {
        return this.value;
    }
    getTimeStamp(): Date {
        return this.timestamp;
    }
    getFrom(): number {
        return this.from;
    }
    getTo(): number {
        return this.to;
    }

}
```
Вы написали класс для работы с базой данных сообщений:
```typescript 
//MessageStore.ts
import { Message } from "./Messages";

export class MessageStore {
    private messages:Message[];
    constructor(){
        this.messages = [];
    }
    getMessages():Message[]{
        return this.messages;
    }
    pushMessage(message:Message){
        this.messages.push(message);
    }
    
}
```
*И тут до вас доходит, что MessageStore работает с типом Message, а как же сотни других сообщений с типом OldMessage? Нельзя же их просто удалить и забыть о них.*
## Решение
*Паттерн адаптер подгоняет объект, реализующий один интерфейс под другой интерфейс. Работа паттерна очень похожа на декоратор, вот только вместо дополнения к уже существующему методу, адаптер реализует другой интерфейс и подгоняет полученный в конструкторе объект под него.*
Посмотрим на примере:
```typescript
//MessageAdapter.ts
import { Message, OldMessage } from "./Messages";
//Адаптер реализует тот интерфейс, под который нужно подогнать другой объект
export class MessageAdapter extends Message{
    value: string | number;
    timestamp: Date;
    from: number;
    to: number;
    oldMessage:OldMessage;
    // В конструкторе передается объект, который нужно подогнать под другой интерфейс
    constructor(oldMessage:OldMessage){
        super();
        this.oldMessage = oldMessage;
        //теперь в value записывается текстовое значение
        this.value = oldMessage.getText();
        //строковое представление даты преобразуется в объект Data
        this.timestamp = this.stringTimeToDate(oldMessage.getTime());
        // в этих двух методах ничего не меняется
        this.from = oldMessage.getFrom();
        this.to = oldMessage.getTo();
    }
    getValue(): string | number {
        return this.value;
    }
    getTimeStamp(): Date {
        return this.timestamp;
    }
    getFrom(): number {
        return this.from;
    }
    getTo(): number {
        return this.to;
    }
    stringTimeToDate(dateInString:string){
        //Преобразование строки в объект Data
        // Реальное преобразование не написано чтобы не усложнять код для примера
        console.log(dateInString);
        return new Date();
    }
}
```
*Время тестировать адаптер*
```typescript
//index.ts
import { MessageAdapter } from "./MessageAdapter";
import { DefaultMessage, NumberMessage, OldMessage, Message} from "./Messages";
import { MessageStore } from "./MessageStore";
//Как будто получаем сообщения старого типа из базы данных
let oldMessage1:Message|OldMessage = new DefaultMessage('hi', '01.02.2022', 3, 5);
let oldMessage2:Message|OldMessage = new DefaultMessage('hello','01.01.2022', 45,5);
//А вот сообщения нового типа
let message1 = new NumberMessage(3,new Date(), 4,5);
let message2 = new NumberMessage(12,new Date(), 1,7);
//Объект для управления базой данных
const messageStore = new MessageStore();
let messagesFromDB = [oldMessage1, oldMessage2, message1, message2];
messagesFromDB.forEach((message)=>{
    //Если сообщение старого типа OldMessage, то оборачиваем объект в адаптер, чтобы 
    // MessageStore мог работать с ним как с Message
    if (message instanceof OldMessage){
        message = new MessageAdapter(message);
    }
    messageStore.pushMessage(message);
});
console.log(messageStore.getMessages());
```
**Вывод**
```text
[
MessageAdapter {
    oldMessage: DefaultMessage { text: 'hi', time: '01.02.2022', from: 3, 
to: 5 },
    value: 'hi',
    timestamp: 2022-08-07T15:34:54.026Z,
    from: 3,
    to: 5
  },
  MessageAdapter {
    oldMessage: DefaultMessage {
      text: 'hello',
      time: '01.01.2022',
      from: 45,
      to: 5
    },
    value: 'hello',
    timestamp: 2022-08-07T15:34:54.027Z,
    from: 45,
    to: 5
  },
  NumberMessage {
    value: 3,
    timestamp: 2022-08-07T15:34:54.020Z,
    from: 4,
    to: 5
  },
  NumberMessage {
    value: 12,
    timestamp: 2022-08-07T15:34:54.020Z,
    from: 1,
    to: 7
  }
]
```
*Как мы видим старые сообщения обернуты в адаптер. Адаптер реализует интерфейс Message, так что MessageStore спокойно работает с ним.*
## Итог
*Паттер адаптер помогает подогнать старый и уже рабочий код под новый интерфейс. Это часто нужно после миграции баз данных, или какого-либо структурного изменения в API.*
