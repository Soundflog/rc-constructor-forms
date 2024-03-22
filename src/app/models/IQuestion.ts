import {IVariant} from "./IVariant";
import {QuestionType} from "./form/questionType.enum";

export interface IQuestion {
  id: number
  content: string
  type: QuestionType
  variants: IVariant[]
  required?: boolean | false
}
