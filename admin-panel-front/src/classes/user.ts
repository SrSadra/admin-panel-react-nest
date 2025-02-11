import { Role } from "./role";

export class User {
    constructor(public first_name : string = "", public last_name : string = "" ,public id : number = -1,public email: string = "", public role = new Role()){}

    get name(){
        return `${this.first_name} ${this.last_name}`;
    }

}