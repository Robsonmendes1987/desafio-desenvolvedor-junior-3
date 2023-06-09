import { PostsRepositories, PostsProps } from "../../repositories/posts-repositoriess";
import {UsersRepositories} from "../../repositories/users-repositories"
import { invalidCredentialError } from "../errors/invalid-credentials-error";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

interface PostResponse {
    post: PostsProps
}



export class RegisterPost {
    constructor (private readonly postsRepositories: PostsRepositories,
        private readonly usersRepositories: UsersRepositories
        ) {}
    create = async ({authorId, title, content}: PostsProps): Promise<PostResponse> => {
        const findUser = await this.usersRepositories.findById(authorId)
        if(!findUser){
            throw new ResourceNotFoundError()
        }
        const post = await this.postsRepositories.create({authorId: findUser.id, title, content})
        return {post}
    }
}