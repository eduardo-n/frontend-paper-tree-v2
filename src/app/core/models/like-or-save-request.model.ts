import { PostModel } from "./post.model";
import { UserModel } from "./user.model";

export interface LikeOrSaveRequestModel{
  author: UserModel,
  post: PostModel
}
