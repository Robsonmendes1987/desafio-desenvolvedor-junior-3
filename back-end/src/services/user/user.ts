import {UserProps ,UsersRepositories } from "../../repositories/users-repositories";
import   {hash} from"bcryptjs"
import { userAlreadyExistsError } from "../errors/user-already-exists-error";
  

interface UserResponse {
    user: UserProps
}

export class RegisterUserService {
    constructor( private usersRepositories: UsersRepositories) {}
    create = async ({name, email, password}: UserProps): Promise<UserResponse> => {
        const passwordHash = await hash(password, 6)
        // const userAlreadyExist = await this.usersRepositories.findByEmail(email)
        // if(userAlreadyExist) {
            //     throw new userAlreadyExistsError()
            // }
            const user = await this.usersRepositories.create({name, email, password: passwordHash})
            console.log('CHEGOU',  password)
        return {user}

    }
}