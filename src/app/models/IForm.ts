import {IQuestion} from "./IQuestion";
import {IScale} from "./IScale";

export interface IForm{
  id: number
  name: string
  description: string
  scale_id: IScale,
  questions: IQuestion[]
}
