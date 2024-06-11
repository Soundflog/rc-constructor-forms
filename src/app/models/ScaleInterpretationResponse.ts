import {IInterpretation} from "./IInterpretation";

export interface IScaleInterpretationResponse {
  id?: number
  description: string
  name: string
  interpretations: IInterpretation[]
}
