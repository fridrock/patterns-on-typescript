import { Message, OldMessage } from "./Messages";

export class MessageAdapter extends Message{
    value: string | number;
    timestamp: Date;
    from: number;
    to: number;
    oldMessage:OldMessage;
    constructor(oldMessage:OldMessage){
        super();
        this.oldMessage = oldMessage;
        this.value = oldMessage.getText();
        this.timestamp = this.stringTimeToDate(oldMessage.getTime());
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
        console.log(dateInString);
        return new Date();
    }
}