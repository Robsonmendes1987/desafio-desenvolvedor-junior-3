import { PostResponse, PostsProps, PostsRepositories } from "../../src/repositories/posts-repositoriess";
import {randomUUID} from "node:crypto"


export class InMemoryPostRepository implements PostsRepositories{
    public items:  PostResponse[] = []
    async create (data: PostResponse): Promise<PostResponse> {
        const post = {id: randomUUID(), authorId: data.authorId, content: data.content, title: data.title}
        this.items.push(post)
        return post
    }

    async findById(id: string): Promise<PostResponse | null> {
        const post = this.items.find(item => item.id === id )
        if(!post) {
            return null
        }
        return post
    }

}