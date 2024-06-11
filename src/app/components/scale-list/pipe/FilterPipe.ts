import {Pipe, PipeTransform} from "@angular/core";
import {IForm} from "../../../models/IForm";
import {IInterpretation} from "../../../models/IInterpretation";
import {IScaleInterpretationResponse} from "../../../models/ScaleInterpretationResponse";

@Pipe({
  name: 'interFilter'
})
export class InterFilterPipe implements PipeTransform {
  transform(items: IScaleInterpretationResponse[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(searchTerm));
  }
}
