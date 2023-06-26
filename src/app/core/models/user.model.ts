import { ContributorTypeEnum } from "../enum/contributor-type.enum";

export interface UserModel{
  id: number,
  name: string,
  email: string,
  cpf: string,
  register: number,
  course: string,
  password: string,
  admissionDate: Date,
  contributorType: ContributorTypeEnum
}
