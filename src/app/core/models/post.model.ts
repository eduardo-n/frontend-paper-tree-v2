import { LikeModel } from "./like.model";
import { ToSaveModel } from "./to-save.model";
import { WorkModel } from "./work.model";

export interface PostModel {
  id: number,
  work: WorkModel,
  likes: LikeModel[],
  savedWorks: ToSaveModel[]
}
