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