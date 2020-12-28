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

    static formatDate(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}
export class CompanyUser extends UserBase {
    constructor(details?: any) {
        super(details)
    }
}

export type UserType = "company" | "individual"