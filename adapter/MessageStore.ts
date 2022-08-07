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