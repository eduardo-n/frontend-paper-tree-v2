import { LikeModel } from "./like.model";
import { ToSaveModel } from "./salvar-trabalho.model";
import { WorkModel } from "./trabalho.model";

export interface PostModel {
  id: number,
  work: WorkModel,
  likes: LikeModel[],
  savedWorks: ToSaveModel[]
}
