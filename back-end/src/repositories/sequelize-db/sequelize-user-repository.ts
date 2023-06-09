import { UserProps, UserResponse, UsersRepositories } from "../users-repositories";
import User from '../../models/user.model'
export class SequelizeUserRepository implements UsersRepositories {
   async create({name, email, password}: UserProps): Promise<UserResponse> {
        const user = await User.create({name, email, password})
        console.log('OLA SEQUELIZE', user)
        return  user;

    }

    async findByEmail(email: string): Promise<UserResponse | null> {
        const user = await User.findOne({where: {email}})
        return user
        
        
    }

    async findById(id: string): Promise<UserResponse | null> {
        const user = await User.findByPk(id)
        if(!user) {
            return null;
        }
        return  user;
    }
}