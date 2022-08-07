import { Client } from "./Client";
import { Database } from "./Database";
import { Server } from "./Server";
import { VirtualServer } from "./VirtualServer";

export class SiteFacade{
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