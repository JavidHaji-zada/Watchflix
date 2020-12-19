abstract class UserBase {
    type: UserType;
    username: string;
    email: string;

    constructor(details?: any) {
        this.type = details.type
        this.username = details.username
        this.email = details.email
    }
}

export class User extends UserBase {
    birthday: Date;
    fullname: string;
    constructor(details?: any) {
        super(details)
        this.birthday = new Date(details.birthday)
        this.fullname = details.fullname
    }
}
export class CompanyUser extends UserBase {
    constructor(details?: any) {
        super(details)
    }
}

export type UserType = "company" | "individual"