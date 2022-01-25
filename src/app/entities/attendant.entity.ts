import { User } from "./user.entity";

export class Attendant extends User{

    private employerId!: string

    constructor(){
        super()
    }
    

    setEmployerId(employerId: string): void{
        this.employerId = employerId
    }

    getEmployerId(): string{
        return this.employerId;
    }

    
}