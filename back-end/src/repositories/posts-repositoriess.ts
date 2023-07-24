export interface PostsProps {
  name: string
  authorId?: string
  title: string
  content: string
}

export interface PostsPropsById {
  id?: string
  // authorId: string
  title: string
  content: string
}

export interface PostResponse {
  name: string
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
  puth(data: PostsPropsById): Promise<PostResponse>
}
