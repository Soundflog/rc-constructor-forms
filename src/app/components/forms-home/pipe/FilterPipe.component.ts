import { Pipe, PipeTransform } from '@angular/core';
import {IForm} from "../../../models/IForm";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: IForm[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(searchTerm));
  }
}
