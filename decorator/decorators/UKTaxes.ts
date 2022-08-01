import { Salary } from "../components/Salary";
import { SalaryDecorator } from "./SalaryDecorator";

export class UnitedKingdomTaxes extends SalaryDecorator{
    constructor(salary:Salary){
        super(salary);
    }
    getSalary(): number {
        return this.salary.getSalary() - this.salary.getSalary()*0.2;
    }
}