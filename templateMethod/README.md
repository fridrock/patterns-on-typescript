# Шаблонный метод
# Проблема
Вы разрабатываете сайт, у вас есть два класса, которые загружают разные типы файлов:Картинку и JSON. Вот как они выглядят:
```typescript
//badexample/badindex.ts
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
```
Дальше вы создаете два объекта этих классов и скачиваете их
```typescript
const image = new IMAGEUpload();
const json = new JSONUpload();
image.upload();
console.log('\n\n\n\n');
json.upload();
//Вывод
/*
Got image URL
Image downloaded
Image saved in database
Image saved





Got JSON URL
JSON downloaded
JSON saved in database
JSON saved
*/
```
Вы четко видите, что впринципе файлы сохраняются по одному алгоритму:
- Получить URL до файла.
- Скачать файл.
- Сохранить файл в базе данных.
- Отправить оповещение клиенту, что файл был скачан и сохранен.

**Отличается лишь реализация этого алгоритма в зависимости от типа файла, но не его структура**.
*Например файл JSON надо скачать и сохранить в базе данных как объект, а в случае с картинкой надо сгенерировать рандомное имя для файла и путь до него в папке static.*
А что если вам понадобится сохранить файл с типом txt? Снова дублировать код и описывать ту же самую инструкцию, но с немного другой реализацией? Тут на помощь приходит паттерн **Шаблонный метод**.
## Решение
Паттерн шаблонный метод состоит из следующих компонентов:
- Глобальный класс содержащий шаблонный метод, который описывает общую инструкцию
- Субклассы, описывающие отличающуюся реализацию.

Давайте на примере:
- Глобальный класс, содержащий общую инструкцию
```typescript
//FileUpload.ts
export abstract class FileUpload{
    upload():void{
        //Вот общий алгоритм по скачке и сохранению файла на сервере
        //Метод showProcess будет объяснен позже
        this.showProcess('getURL');
        this.getFileURL();
        this.showProcess('download');
        this.download();
        this.showProcess('saving');
        this.saveInDatabase();
        this.sendNotification();
    }
    //Получение URL для всех типов файлов одинаковое, так что этот метод
    //можно реализовать и в главном классе.
    getFileURL(){
        console.log('Got file\'s URL');
    }
    //Методы download(), saveInDatabase() имеют разную реализацию,
    //в зависимости от типа файла, поэтому они объявляются как абстрактные

    /*Скачивание файлов реализовывается по разному, например JSON можно
    отпарсить стандартным express.json(), а для получения картинки надо использовать другую утилиту.
    */ 
    abstract download():void;
    //JSON записывается в БД как сущность, а в случае картинки
    //записывается только путь до нее 
    abstract saveInDatabase():void;
    sendNotification():void{
        console.log('File saved')
    }
    showProcess(type:string){}
}
```
Теперь напишем два класса, которые предоставляют свою реализацию методов download(), saveInDatabase()
```typescript 
//ImageUpload.ts
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
//JsonUpload.ts
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
```
Эти два класса предоставили разные реализации методов download(), saveInDatabase(). Мы избежали дублирования кода, теперь пора обсудить что такое **showProcess()**.
## Перехватчики
Допустим в некоторых случаях мы хотим добавить дополнительный функционал к алгоритму, но выборочно, например если мы скачиваем Json файл, то хотим выводить в консоли каждый этап этого процесса.
В родительском классе **FileUpload** мы описали метод **showProcess()** с пустой реализацей, и вызываем его перед началом каждого этапа скачивания:
```typescript
//Метод вызывается перед getFileUrl();
this.showProcess('getURL');
this.getFileURL();
```
Теперь нам нужно просто переопределить метод **showProcess()** в субклассе **JsonUpload**:
```typescript
showProcess(type: "getURL"|"download"|"saving"): void {
        const answers = {
            "getURL":'Process is on stage of getting URL',
            "download":'Process in on stage of downloading',
            "saving":'Process is on stage of saving in database'
        }
        console.log(answers[type]);
    }
```
Теперь перед началом каждого этапа скачки мы выводим оповещение, о том что какой-либо процесс начался.
*Такие методы как **showProcess** называются перехватчиками. Они срабатывают только если субклассу это нужно, в противном случае это просто методы пустышки, не имеющие реализаци в родительском классе.*
## Результат работы программы
```typescript
import { ImageUpload } from "./ImageUpload";
import { JsonUpload } from "./JsonUpload";

const jsonFile = new JsonUpload();
const imageFile = new ImageUpload();
jsonFile.upload();
console.log('\n\n\n');

imageFile.upload();
//Вывод
/*
Process is on stage of getting URL
Got file's URL
Process in on stage of downloading
Downloaded JSON file
Process is on stage of saving in database
Saved in database JSON file
File saved

При скачивании Json файла сработал наш метод-перехватчик showProcess()


Got file's URL
Downloaded image
Saved in database Image path
File saved
*/
```
## Итог
Паттерн шаблонный метод позволяет описать общую структуру какого-либо алгоритма, а в случае отличия в реализации предоставляет возможность субклассировать изменения. С помощью этого паттерная разработчик уменьшает количество дублируемого кода.