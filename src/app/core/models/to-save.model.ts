import { UserModel } from "./user.model";

export interface ToSaveModel{
  id: number,
  author: UserModel
}
