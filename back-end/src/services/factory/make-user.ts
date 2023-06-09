import { SequelizeUserRepository } from "../../repositories/sequelize-db/sequelize-user-repository";
import { RegisterUserService } from "../user/user";

export function MakUser(){
   const  useRepository = new SequelizeUserRepository()
   const  registerUser = new  RegisterUserService(useRepository)
   return registerUser


}