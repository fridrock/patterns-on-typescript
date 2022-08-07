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
