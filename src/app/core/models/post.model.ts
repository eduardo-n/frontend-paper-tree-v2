import { LikeModel } from "./like.model";
import { SaveModel } from "./save.model";
import { WorkModel } from "./work.model";

export interface PostModel {
  id: number,
  work: WorkModel,
  likes: LikeModel[],
  savedWorks: SaveModel[]
}
