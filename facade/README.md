# Фасад
## Проблема 
Вы создатель сайта, вы написали практически все компоненты( база данных, виртуальный сервер, сервер и клиент фронтенда). 
Вот все службы, которые вы описали
```typescript
//Client.ts
export class Client{
    build(){
        console.log('builded frontend');
    }
    startClientServer(){
        console.log('started client server');
    }
    unbuild(){
        console.log('unbuilded frontend');
    }
    stopClientSever(){
        console.log('stopped client server');
        
    }
}
//Database.ts
export class Database{
    init(){
        console.log('database was created');
    }
    browseTables(){
        console.log(`database browsed tables`);
    }
    unbrowseTables(){
        console.log('database unbrowsed tables');
    }
    drop(){
        console.log('database was dropped');
    }

}
//Server.ts
export class Server{
    start(){
        console.log('started microservices and APIs');
    }
    stop(){
        console.log('stopped microservices and APIs');
    }
}
//VirtualServer.ts
export class VirtualServer{
    start(){
        console.log('virtual server started');
    }
    setHost(){
        console.log('virtual server settled host');
    }
    setDomain(){
        console.log('virtual server settled domain');
    }
    stop(){
        console.log('virtual server stopped');
    }
    unsetHost(){
        console.log('host was unsettled');
    }
    unsetDomain(){
        console.log('domain was unsettled');
    }
}
```

Все что вам осталось это лишь запустить сайт, а через промежуток остановить его работу, вот ваш первоначальный вариант запуска сайта:
```typescript 
//commented in index.ts
import { Client } from "./Client";
import { Database } from "./Database";
import { Server } from "./Server";
import { VirtualServer } from "./VirtualServer";

let db = new Database();
let server = new Server();
let virtualServer = new VirtualServer();
let client = new Client();
db.init();
db.browseTables();
server.start();
virtualServer.start();
virtualServer.setDomain();
virtualServer.setHost();
client.build();
client.startClientServer();
console.log('\n\n\n');

setTimeout(() => {
    db.drop()
    db.unbrowseTables();
    server.stop();
    virtualServer.unsetDomain();
    virtualServer.unsetHost();
    virtualServer.stop();
    client.unbuild();
    client.stopClientSever();
}, 3000);
```
Получился очень громоздкий код, а что если вам нужно будет снова запустить код но через время? Опять писать тонны инструкций для запуска всех этих служб? А если надо протестировать только бекенд, исключив фронтенд? 
*В данном примере все службы - огромная подсистема.*
**Паттерн фасад предоставляет упрощенный интерфейс взаимодействия с огромной подсистемой, а также ограничивает клиента от инициализации необходимых служб**.
*Все службы в паттерне фасад размещаются посредством композиции, вот пример фасада:*
```typescript 
//SiteFacade.ts
import { Client } from "./Client";
import { Database } from "./Database";
import { Server } from "./Server";
import { VirtualServer } from "./VirtualServer";

export class SiteFacade{
    //Инициализация необходимых служб
    public db:Database;
    public client:Client;
    public virtualServer:VirtualServer;
    public server:Server;
    constructor(){
        this.db = new Database();
        this.client = new Client();
        this.virtualServer = new VirtualServer();
        this.server = new Server();
    }
    //различные методы, взаимодействующие с службами
    startSite(){
        this.startBackend()
        this.client.build();
        this.client.startClientServer();
    }
    stopSite(){
        this.stopBackend();
        this.client.unbuild();
        this.client.stopClientSever();
    }
    startBackend(){
        this.db.init();
        this.db.browseTables();
        this.server.start();
        this.virtualServer.start();
        this.virtualServer.setDomain();
        this.virtualServer.setHost();
    }
    stopBackend(){
        this.db.drop()
        this.db.unbrowseTables();
        this.server.stop();
        this.virtualServer.unsetDomain();
        this.virtualServer.unsetHost();
        this.virtualServer.stop();
    }
    testBackend(){
        this.startBackend();
        setTimeout(() => {
            this.stopBackend();
        }, 3000);
    }
}
```
Теперь все что нужно клиенту, то есть файлу index.ts это следующее:
```typescript 
import { SiteFacade } from "./SiteFacade";
const siteFacade = new SiteFacade();
siteFacade.startSite();
setTimeout(() => {
    siteFacade.stopSite();
}, 3000);
siteFacade.testBackend();
```
## Итог
Паттерн фасад один из самых простых паттернов. По сути все что он делает это упрощает работу с уже существующей подсистемой. Клиент не вынужден обращаться к каждому низкоуровнему компоненту этой системы, хотя и имеет такую возможность для более гибкой настройки.
