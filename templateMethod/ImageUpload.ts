import { FileUpload } from "./FileUpload";

export class ImageUpload extends FileUpload{
    download(): void {
        console.log('Downloaded image');
    }
    saveInDatabase(): void {
        console.log('Saved in database Image path');
    }
}