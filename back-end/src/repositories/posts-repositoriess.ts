export interface PostsProps {
    authorId: string;
    title: string;
    content: string;
}

export interface PostResponse {
    id: string;
    authorId: string;
    title: string;
    content: string;
}

export interface PostsRepositories {
    create (data: PostsProps): Promise<PostResponse> 
    findById (id: string): Promise<PostResponse | null>
}
