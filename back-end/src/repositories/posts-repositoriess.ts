export interface PostsProps {
  // id: string
  authorId: string
  title: string
  content: string
}

export interface PostResponse {
  id: string
  authorId: string
  title: string
  content: string
}

export interface PostsRepositories {
  create(data: PostsProps): Promise<PostResponse>
  findById(id: string): Promise<PostResponse>
  findAll(): Promise<PostResponse[]>
  destroy(id: string): Promise<any>
  puth(data: PostsProps): Promise<PostResponse>
}
