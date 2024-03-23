import {IQuestion} from "./IQuestion";
import {IScale} from "./IScale";

export interface IForm{
  id?: number
  name: string
  description: string
  scaleId: IScale,
  questions: IQuestion[]
}
