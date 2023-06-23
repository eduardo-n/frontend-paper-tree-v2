import { PostModel } from "./post.model";
import { UserModel } from "./user.model";

export interface LikeRequestModel{
  author: UserModel,
  post: PostModel
}
