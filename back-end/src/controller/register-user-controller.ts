import { Request, Response } from "express";
import { MakUser } from "../services/factory/make-user";
import { userAlreadyExistsError } from "../services/errors/user-already-exists-error";
import { RegisterUserService } from "../services/user/user";
import { SequelizeUserRepository } from "../repositories/sequelize-db/sequelize-user-repository";

interface createUser {
    name: string
    email: string
    password: string

}
const registerUseCase =  MakUser()

export default class RegisterUserController {

    register = async (req: Request<object, object, createUser>, res: Response) => {
        const {name, email, password} = req.body
        try {

            const user = await registerUseCase.create({email, name, password})
            console.log("PEGOU",req.body)
            return res.status(201).json(user)
        } catch(error) {
            if(error instanceof userAlreadyExistsError){
                return res.status(409).json({message: error.message})
            }

        }
    }
}