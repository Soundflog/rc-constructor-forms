import {IScale} from "./IScale";

export interface IInterpretation {
  id?: number
  description: string
  minValue: number
  maxValue: number
  scale?: IScale
}
