import { ImageUpload } from "./ImageUpload";
import { JsonUpload } from "./JsonUpload";

const jsonFile = new JsonUpload();
const imageFile = new ImageUpload();
jsonFile.upload();
console.log('\n\n\n');

imageFile.upload();