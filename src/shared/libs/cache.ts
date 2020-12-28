import { CompanyUser, User } from "../models/user";

export class Cache {

    static setCurrenUser(user: User | CompanyUser): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    static logoutUser(): void {
        localStorage.removeItem('currentUser');
    }
}