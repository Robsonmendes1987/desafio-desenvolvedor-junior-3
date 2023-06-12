export interface UserProps {
  id?: string
  name: string
  password: string
  email: string
}

export interface UserResponse {
  id: string
  name: string
  password: string
  email: string
}
export interface UsersRepositories {
  create(data: UserProps): Promise<UserResponse>
  findByEmail(email: string): Promise<UserResponse | null>
  findById(id: string): Promise<UserResponse | null>
}
