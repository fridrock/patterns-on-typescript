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