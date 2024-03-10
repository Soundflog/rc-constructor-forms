import {IVariant} from "./IVariant";

export interface IQuestion {
  id: number
  content: string
  variants: IVariant[]
}
