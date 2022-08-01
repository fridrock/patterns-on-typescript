import { Salary } from "../components/Salary";
export abstract class SalaryDecorator extends Salary{
    protected salary:Salary;
    constructor(salary:Salary){
        super();
        this.salary = salary;
    }
}