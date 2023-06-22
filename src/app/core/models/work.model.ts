import { UserModel } from "./user.model";

export interface WorkModel{
  id: number,
  title: string,
  area: string,
  description: string,
  rating: number,
  creationDate: Date,
  contributors: UserModel[]
}
