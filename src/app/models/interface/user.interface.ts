export interface IAuthUser{
  username: string
  password: string
}

export interface IUserJwtResponse {
  roles: string[]
  token: string
}
