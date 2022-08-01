//Первый субкласс-компонет, который просто устанавливает зарплату для джуниора
import { Salary } from "./Salary";
export class SalaryForJunior extends Salary{
    private salary:number;
    constructor(){
        super();
        this.salary = 200;
    }
    getSalary(): number {
        return this.salary;
    }
}