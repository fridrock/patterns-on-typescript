
// import { Client } from "./Client";
// import { Database } from "./Database";
// import { Server } from "./Server";
// import { VirtualServer } from "./VirtualServer";

import { SiteFacade } from "./SiteFacade";

// let db = new Database();
// let server = new Server();
// let virtualServer = new VirtualServer();
// let client = new Client();
// db.init();
// db.browseTables();
// server.start();
// virtualServer.start();
// virtualServer.setDomain();
// virtualServer.setHost();
// client.build();
// client.startClientServer();
// console.log('\n\n\n');

// setTimeout(() => {
//     db.drop()
//     db.unbrowseTables();
//     server.stop();
//     virtualServer.unsetDomain();
//     virtualServer.unsetHost();
//     virtualServer.stop();
//     client.unbuild();
//     client.stopClientSever();
// }, 3000);
const siteFacade = new SiteFacade();
siteFacade.startSite();
setTimeout(() => {
    siteFacade.stopSite();
}, 3000);
siteFacade.testBackend();