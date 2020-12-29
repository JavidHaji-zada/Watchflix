import { CompanyUser, User } from "../models/user";

export class Cache {

    static setCurrenUser(user: User | CompanyUser): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    static logoutUser(): void {
        localStorage.removeItem('currentUser');
    }

    static getCurrentUser(): User | CompanyUser | undefined {
        let currentUser = localStorage.getItem('currentUser')
        console.log('current user ', currentUser)
        if (currentUser != null) {
            let curUser = JSON.parse(currentUser || '')
            if (curUser != null) {
                if (curUser.type == 'individual') {
                    return new User(curUser)
                } else {
                    return new CompanyUser(curUser)
                }
            }
        }
        return undefined
    }
}