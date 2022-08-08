export abstract class FileUpload{
    upload():void{
        this.showProcess('getURL');
        this.getFileURL();
        this.showProcess('download');
        this.download();
        this.showProcess('saving');
        this.saveInDatabase();
        this.sendNotification();
    }
    getFileURL(){
        console.log('Got file\'s URL');
    }
    abstract download():void;
    abstract saveInDatabase():void;
    sendNotification():void{
        console.log('File saved')
    }
    showProcess(type:string){}
}