class IMAGEUpload{
    upload(){
        this.getURLImage();
        this.downloadImage();
        this.saveImageInDb();
        this.sendNotification();
    }
    sendNotification() {
        console.log('Image saved')
    }
    saveImageInDb() {
        console.log("Image saved in database");
    }
    downloadImage() {
        console.log('Image downloaded')
    }
    getURLImage() {
        console.log('Got image URL');
    }
    
}
class JSONUpload{
    upload(){
        this.getURLJson();
        this.downloadJson();
        this.saveJsonInDb();
        this.sendNotification();
    }
    sendNotification() {
        console.log('JSON saved')
    }
    saveJsonInDb() {
        console.log("JSON saved in database");
    }
    downloadJson() {
        console.log('JSON downloaded')
    }
    getURLJson() {
        console.log('Got JSON URL');
    }
}
const image = new IMAGEUpload();
const json = new JSONUpload();
image.upload();
console.log('\n\n\n\n');
json.upload();