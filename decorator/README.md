# Декоратор
## Проблема 
*Часто нам нужно добавить какой-либо допольнительный функционал к уже существующему и работающему коду, например добавить вычет налога к уже существующему объекту зарплаты. Если не использовать паттерн декоратор, то остается только плодить миллионы дополнительных классов например **SalaryForUnitedKingdom**, а теперь представьте, что в надо добавить зарплату для разных должностей в компании. А если зарплата зависит от отдела работника? Как вам дополнительный класс **SalaryForTeamLeadOfSoftwareDevelopmentForUnitedKingdom**? Устрашающе правда?*
## Состав паттерна
- ключевой класс, от которого будут наследоваться как компоненты, так и декораторы.
- компоненты, к которым надо добавить функционал.
- декораторы, добавляющие функционал.
## Как работает декоратор?
*Декоратор наследуется от супер-класса, поэтому имеет все те же методы, как и у классов-компонентов, которые наследуются от супер-класса. Когда нам нужно обернуть класс-компонент в декоратор, мы просто передаем класс-компонент аргументом в конструктор декоратора. Декоратор наследуется от супер-класса, поэтому имеет такой же тип как и у класса-компонента. Декоратор добавляет какой-то функционал необходимый метод, а потом вызывает этот метод у класса-компонента(добавляя, удаляя, изменяя) полученное значение. Может быть звучит сложно, но пример все покажет.*
## Пример декоратора
*У вас есть два друга: Teamlead и Junior программисты. Они нашли для себя вакансии в одной интернациональной компании, которая имеет два офиса: в Англии и в США. Две страны накладывают разные налоги на работников, так что их интересует куда будет выгоднее поехать.*
- Создадим супер-класс Salary, от которого будут наследоваться декораторы и компоненты:
```typescript
//Ключевой класс который реализует общий метод,
//присущий потом как субклассам компонетам, так и декораторам
export abstract class Salary{
    abstract getSalary():number;
}
```
- Теперь реализуем два класса-компонента:
```typescript
//SalaryForJunior.ts
import { Salary } from "./Salary";
export class SalaryForJunior extends Salary{
    private salary:number;
    constructor(){
        super();
        // Зарплата джуниора без вычета налогов
        this.salary = 200;
    }
    getSalary(): number {
        return this.salary;
    }
}
//SalaryForTeamlead.ts
import { Salary } from "./Salary";
export class SalaryForTeamLead extends Salary{
    private salary:number;
    constructor(){
        super();
        // Зарплата тимлида без вычета налогов
        this.salary = 1000;
    }
    getSalary(): number {
        return this.salary;
    }

}
```
- Начинаем магию: создаем общий класс для всех декораторов
```typescript
//SalaryDecorator.ts
import { Salary } from "../components/Salary";
/*Декоратор наследует тот же класс, что и классы-компоненты
Это сделано для того, чтобы в уже созданную переменную 
класса-компонента можно было записать обертку над компонентом*/
export abstract class SalaryDecorator extends Salary{
    protected salary:Salary;
    // Добавляем в свойство salary класс-компонент
    constructor(salary:Salary){
        super();
        this.salary = salary;
    }
}
```
- Реализуем первый декоратор:
```typescript
//UnitedKingdomTaxes.ts
import { Salary } from "../components/Salary";
import { SalaryDecorator } from "./SalaryDecorator";

export class UnitedKingdomTaxes extends SalaryDecorator{
    constructor(salary:Salary){
        super(salary);
    }
    //В Великобритании простые налоги: 20% на всех работников
    getSalary(): number {
        /*из зарплаты без налогов,
        полученной из класса-компонента, переданного
        в качестве аргумента конструктора вычитаем 20%
        */
        return this.salary.getSalary() - this.salary.getSalary()*0.2;
    }
}
```
*Это достаточно простой декоратор, однако что если нам нужно менять поведение, основываясь на типе класса-компонента? Допустим в США налог на тимлида 10%, а на джуниора 30%.*
- Реализуем более сложный декоратор
```typescript
//AmericanTaxes.ts
import { SalaryDecorator } from "../decorators/SalaryDecorator";
import { Salary } from "../components/Salary";
import { SalaryForJunior } from "../components/SalaryForJunior";
import { SalaryForTeamLead } from "../components/SalaryForTeamlead";
export class AmericanTaxes extends SalaryDecorator{
    constructor(salary:Salary){
        super(salary);
    }
    getSalary(): number {
        let salaryAfterTaxes:number;
        //Для разных работников разные налоги
        if (this.salary instanceof SalaryForJunior){
            salaryAfterTaxes = this.salary.getSalary() - this.salary.getSalary()*0.3;
        }
        else if (this.salary instanceof SalaryForTeamLead){
            salaryAfterTaxes = this.salary.getSalary() - this.salary.getSalary()*0.1;
        }
        else{
            salaryAfterTaxes = 0;
        }
        return salaryAfterTaxes;
    }
}
```
*Этот декоратор выдает конечный результат, основываясь на типе класса-компонента, переданного в конструкторе*
- Тестируем получившуюся программу
```typescript 
//decoratorTest.ts
import {SalaryForJunior} from './components/SalaryForJunior';
import { SalaryForTeamLead } from './components/SalaryForTeamlead';
import { AmericanTaxes } from './decorators/AmericanTaxes';
import { UnitedKingdomTaxes } from './decorators/UKTaxes';
//Создаем два объекта с зарплатами
let teamLeadSalary = new SalaryForTeamLead();
let juniorSalary = new SalaryForJunior();
// Оборачиваем декораторами
let [americanTaxesForTeamlead, americanTaxesJunior] = [new AmericanTaxes(teamLeadSalary), new AmericanTaxes(juniorSalary)]
let [britishTaxesForTeamlead, britishTaxesForJunior] = [new UnitedKingdomTaxes(teamLeadSalary), new UnitedKingdomTaxes(juniorSalary)]
// Выводим получившийся результат
console.log(`
Salaries before taxes:
Teamlead:${teamLeadSalary.getSalary()}
Juniour:${juniorSalary.getSalary()}
Teamlead Salary after taxes:
UK:${britishTaxesForTeamlead.getSalary()}
USA:${americanTaxesForTeamlead.getSalary()}
Junior Salary after taxes:
UK:${britishTaxesForJunior.getSalary()}
USA:${americanTaxesJunior.getSalary()}
`)
```
- Вывод программы:
```text 
Salaries before taxes:
Teamlead:1000
Juniour:200
Teamlead Salary after taxes:
UK:800
USA:900
Junior Salary after taxes:
UK:160
USA:140
```
## Вывод
*Используя паттерн декоратор, мы смогли помочь друзьям программистам выбрать более выгодное место работы. При этом мы наделили объект Salary дополнительным функционалом, не используя при этом огромные цепочки наследования.*