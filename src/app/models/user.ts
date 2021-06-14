export class User {

    constructor(public name: string, public email: string, public password: string, public phoneNumber: number )
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}
