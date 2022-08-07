import { MessageAdapter } from "./MessageAdapter";
import { DefaultMessage, NumberMessage, OldMessage, Message} from "./Messages";
import { MessageStore } from "./MessageStore";
//Как будто получаем сообщения старого типа из базы данных
let oldMessage1:Message|OldMessage = new DefaultMessage('hi', '01.02.2022', 3, 5);
let oldMessage2:Message|OldMessage = new DefaultMessage('hello','01.01.2022', 45,5);
//А вот сообщения нового типа
let message1 = new NumberMessage(3,new Date(), 4,5);
let message2 = new NumberMessage(12,new Date(), 1,7);
const messageStore = new MessageStore();
let messagesFromDB = [oldMessage1, oldMessage2, message1, message2];
messagesFromDB.forEach((message)=>{
    if (message instanceof OldMessage){
        message = new MessageAdapter(message);
    }
    messageStore.pushMessage(message);
});
console.log(messageStore.getMessages());


