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
  findById(id: string): Promise<PostResponse | null>
  findAll(data: PostsProps): Promise<PostResponse[] | null>
  delete(id: string): Promise<void>
  puth(data: PostsProps): Promise<PostResponse | null>
}
