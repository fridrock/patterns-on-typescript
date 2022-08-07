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