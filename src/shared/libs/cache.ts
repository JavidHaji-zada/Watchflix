import { CompanyUser, User } from "../models/user";

export class Cache {

    static setCurrenUser(user: User | CompanyUser): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    static logoutUser(): void {
        localStorage.removeItem('currentUser');
    }

    static getCurrentUser(): User | CompanyUser {
        let currentUser = JSON.parse(localStorage.getItem('currentUser') || '')
        if (currentUser.type == 'individual') {
            return new User(currentUser)
        } else {
            return new CompanyUser(currentUser)
        }
    }
}