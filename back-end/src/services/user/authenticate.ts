import { compare } from "bcryptjs";
import { UserProps, UsersRepositories } from "../../repositories/users-repositories";
import { invalidCredentialError } from "../errors/invalid-credentials-error";

interface UserResponse {
    user: UserProps
}

interface User {
    email: string;
    password: string;
}

export class AuthenticateService {
    constructor(private readonly usersRepositories: UsersRepositories) {}

    authenticate =  async ({email, password}: User) : Promise<UserResponse> => {
        const user = await this.usersRepositories.findByEmail(email)
        if(!user)  {
            throw new invalidCredentialError()
        }
        const validatePassword = await compare(password, user.password)
        if(!validatePassword) {
            throw new invalidCredentialError()
        }

        return {user}
    }

}