export interface IUser {
  // TODO: fix
  id: number,
  name: {
    firstName: string
    lastName: string
  },
  email: string,
  isAdmin: boolean,
  dateBirth: string,
  status: "active" | "banned" | "unverified",
  photo: string
}
