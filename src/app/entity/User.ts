export interface User {
  id: number
  username: string
  password: string
  roles: string[]
  active: boolean
  lastDate: string
  enabled: boolean
}
