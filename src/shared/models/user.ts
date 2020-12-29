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

    static formatDateHours(date_ob: Date): string {
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }
}
export class CompanyUser extends UserBase {
    name: string
    constructor(details?: any) {
        super(details)
        this.name = details.name
    }
}

export type UserType = "company" | "individual"