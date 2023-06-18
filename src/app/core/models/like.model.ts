import { UserModel } from "./user.model";

export interface LikeModel{
  id: number,
  author: UserModel
}
