//Observer interface
interface Subscriber{
    update(state:WeatherState):void;
}


//interface of object that sends subscribers information
interface Subject{
    registerUser(subscriber:Subscriber):void;
    removeUser(subscriber:Subscriber):void;
    notifyUsers():void;
}


//special type for WeatherStation state
type WeatherState = {
    degree:number;
    pressure:number;
    isRain:boolean;
}


//Subject interface realization
class WeatherStation implements Subject{
    subscribers:(Subscriber)[] = [];
    private state:WeatherState = {}! as WeatherState;
    public registerUser(user:Subscriber):void{
        this.subscribers.push(user);
    }
    public removeUser(user:Subscriber):void{
        this.subscribers = this.subscribers.filter((elem)=>elem.name!=user.name);
    }
    notifyUsers(){
        this.subscribers.forEach((user)=>user.update(this.getState()))
    }
    public setState(state:WeatherState):void{
        this.state = state;
        this.notifyUsers();
    }
    public getState():WeatherState{
        return this.state;
    }
}


//first realization of Subscriber interface
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


//second realization of Subscriber interface
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

//defining variables of subject and two subscribers
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