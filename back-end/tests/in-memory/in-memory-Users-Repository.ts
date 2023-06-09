import { UserProps, UserResponse, UsersRepositories } from "../../src/repositories/users-repositories"
import {randomUUID} from "node:crypto"

export class InMemoryUsersRepositories implements UsersRepositories {
    public items: UserResponse[] = []
    async create(data: UserProps): Promise<UserResponse> {
        const user = { id: randomUUID(), name: data.name, email: data.email, password: data.password}

        this.items.push(user)
        return user;
    }
    async findByEmail(email: string): Promise<UserResponse | null> {
        const user = this.items.find(item => item.email === email)
        if(!user) {
            return null;
        }
        return user;
    }

    async findById(id: string): Promise<UserResponse | null> {
        const user = this.items.find(item => item.id === id)
        if(!user) {
            return null;
        }
        return user;
    }

}

