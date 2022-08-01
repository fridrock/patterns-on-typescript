import { Salary } from "./Salary";
export class SalaryForTeamLead extends Salary{
    private salary:number;
    constructor(){
        super();
        this.salary = 1000;
    }
    getSalary(): number {
        return this.salary;
    }

}