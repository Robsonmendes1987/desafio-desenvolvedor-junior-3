import {beforeEach, describe, expect, it} from "vitest"
import { InMemoryUsersRepositories } from "../in-memory/in-memory-Users-Repository"
import { RegisterUser } from "../../src/services/user/user"
import { compare } from "bcryptjs"
import { userAlreadyExistsError } from "../../src/services/errors/user-already-exists-error"
let userRepository: InMemoryUsersRepositories
let sut: RegisterUser

const fakeUser = {
        name: 'Robson Mendes',
        email: 'robson@gmail.com',
        password: '1234',
}
describe("Register user service", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepositories()
        sut = new RegisterUser(userRepository)
    })
    it("Should be able to register", async () => {
        const {user} = await sut.create(fakeUser)
        expect(user.id).toEqual(expect.any(String))

    })

    it("Should hash Password upon registration", async () => {
        const {user} = await sut.create(fakeUser)
        const isPsswordHshad = await compare('1234', user.password) 
        expect(isPsswordHshad).toBe(true)

    })

    it("Should not be able to register with some email twice", async () => {
        await sut.create(fakeUser)
        await expect(async () => sut.create(fakeUser)).rejects.toBeInstanceOf(userAlreadyExistsError)

    })
} )