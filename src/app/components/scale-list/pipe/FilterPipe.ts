import {Pipe, PipeTransform} from "@angular/core";
import {IForm} from "../../../models/IForm";
import {IInterpretation} from "../../../models/form/IInterpretation";

@Pipe({
  name: 'interFilter'
})
export class InterFilterPipe implements PipeTransform {
  transform(items: IInterpretation[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => item.description.toLowerCase().includes(searchTerm));
  }
}
