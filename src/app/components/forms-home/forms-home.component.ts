import {ChangeDetectionStrategy, Component} from '@angular/core';
import {forms} from "../../data/forms";

@Component({
  selector: 'app-forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsHomeComponent {
  forms = forms;
  maxLength: number = 20;
  // Напиши фукнцию, которая будет обрезаннаю возвращать строку, с максимальной длинной
  shortString(str: string): string {
    if (str.length > this.maxLength) {
      return str.slice(0, this.maxLength) + '...';
    }
    return str;
  }
}
