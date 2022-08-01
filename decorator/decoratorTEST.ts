import {SalaryForJunior} from './components/SalaryForJunior';
import { SalaryForTeamLead } from './components/SalaryForTeamlead';
import { AmericanTaxes } from './decorators/AmericanTaxes';
import { UnitedKingdomTaxes } from './decorators/UKTaxes';


let teamLeadSalary = new SalaryForTeamLead();
let juniorSalary = new SalaryForJunior();
let [americanTaxesForTeamlead, americanTaxesJunior] = [new AmericanTaxes(teamLeadSalary), new AmericanTaxes(juniorSalary)]
let [britishTaxesForTeamlead, britishTaxesForJunior] = [new UnitedKingdomTaxes(teamLeadSalary), new UnitedKingdomTaxes(juniorSalary)]
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