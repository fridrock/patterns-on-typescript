//Ключевой класс который реализует общий метод,
//присущий потом как субклассам компонетам, так и декораторам
export abstract class Salary{
    abstract getSalary():number;
}