import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IForm} from "../../models/IForm";
import {forms} from "../../data/forms";
import {tuiIconPlus} from "@taiga-ui/icons";

@Component({
  selector: 'app-forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsHomeComponent {
  forms = forms;
  protected readonly tuiIconPlus = tuiIconPlus;
  maxLength: number = 20;
  // Напиши фукнцию, которая будет обрезаннаю возвращать строку, с максимальной длинной
  shortString(str: string): string {
    if (str.length > this.maxLength) {
      return str.slice(0, this.maxLength) + '...';
    }
    return str;
  }
}
