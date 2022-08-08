import { FileUpload } from "./FileUpload";

export class JsonUpload extends FileUpload{
    download(): void {
        console.log('Downloaded JSON file');
    }
    saveInDatabase(): void {
        console.log('Saved in database JSON file')
    }
    showProcess(type: "getURL"|"download"|"saving"): void {
        const answers = {
            "getURL":'Process is on stage of getting URL',
            "download":'Process in on stage of downloading',
            "saving":'Process is on stage of saving in database'
        }
        console.log(answers[type]);
    }
}