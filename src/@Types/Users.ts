export interface UserLogin {
  [key: string]: string | number | boolean | Date | undefined | null
  email: string
  password: string
}

export interface UserBody extends UserLogin {
  firstname: string
  is_admin: boolean
}

export interface User extends UserBody {
  id: string
  reset_password_token?: string | null
  is_resetting_password: boolean
  created_at: Date
  updated_at?: Date
}

export type Users = User[]
