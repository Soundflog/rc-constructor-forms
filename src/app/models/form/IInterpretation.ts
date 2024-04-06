import {IScale} from "../IScale";

export interface IInterpretation {
  expanded: boolean
  id: number
  description: string
  minValue: number
  maxValue: number
  scale: IScale
}
