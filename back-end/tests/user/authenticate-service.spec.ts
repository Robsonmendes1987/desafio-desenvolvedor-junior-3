import {beforeEach, describe, expect, it} from "vitest"
import { InMemoryUsersRepositories } from "../in-memory/in-memory-Users-Repository"
import { AuthenticateService } from "../../src/services/user/authenticate"
import { compare, hash } from "bcryptjs"
import { userAlreadyExistsError } from "../../src/services/errors/user-already-exists-error"
import { invalidCredentialError } from "../../src/services/errors/invalid-credentials-error"
let userRepository: InMemoryUsersRepositories
let sut: AuthenticateService

const makeFakeUser  = async () => (
    {
        name: 'Robson Mendes',
        email: 'robson@gmail.com',
        password: await hash('1234', 6),
}
) 
describe("Authanticate User Service", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepositories()
        sut = new AuthenticateService(userRepository)
    })
    it("Should be able to authenticate", async () => {
        await userRepository.create(await makeFakeUser())
        const {token} = await sut.authenticate({email: "robson@gmail.com", password: '1234'})
        expect(token).toEqual(expect.any(String))

    })

    it("Should not be able to authenticate with wrong email", async () => {
        await userRepository.create(await makeFakeUser())
       await expect( async () => sut.authenticate({email: "robson.com", password: '1234'})).rejects.toBeInstanceOf(invalidCredentialError)
    })

    it("Should not be able to authenticate with wrong password", async () => {
        await userRepository.create(await makeFakeUser())
       await expect( async () => sut.authenticate({email: "robson@gmail.com", password: '1484'})).rejects.toBeInstanceOf(invalidCredentialError)
    })
} )