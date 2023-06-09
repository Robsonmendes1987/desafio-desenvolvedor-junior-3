import {beforeEach, describe, expect, it} from "vitest"
import { InMemoryPostRepository } from "../in-memory/in-memory-Post-Repository"
import { compare } from "bcryptjs"
import { userAlreadyExistsError } from "../../src/services/errors/user-already-exists-error"
import { RegisterPost } from "../../src/services/post/create-post"
import { InMemoryUsersRepositories } from "../in-memory/in-memory-Users-Repository"
import { ResourceNotFoundError } from "../../src/services/errors/resource-not-found.error"
let postRepository: InMemoryPostRepository
let userRepository: InMemoryUsersRepositories
let sut: RegisterPost

const fakeUser = {
    name: 'Robson Mendes',
    email: 'robson@gmail.com',
    password: '1234',
}

const fakePost = {
    authorId: '1',
    title: 'Elogios',
    content: 'gostaria de parabenizar pelo ecxelente trbalho',
}
describe("Registerpost service", () => {
    beforeEach(() => {
        postRepository = new InMemoryPostRepository()
        userRepository = new InMemoryUsersRepositories()
        sut = new RegisterPost(postRepository, userRepository)
    })
    it("Should be able to register post", async () => {
        const user = await userRepository.create(fakeUser)
        const {post} = await sut.create({authorId: user.id, title: 'Elogios',
        content: 'gostaria de parabenizar pelo ecxelente trbalho'})

        expect(post.authorId).toEqual(expect.any(String))

    })


    it("Should not be able to register post if not found user", async () => {
        await expect(async () => sut.create(fakePost)).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

} )