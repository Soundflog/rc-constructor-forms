import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IForm} from "../../models/IForm";
import {FormService} from "../../services/FormService";

@Component({
  selector: 'app-forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsHomeComponent implements OnInit{
  @Input() formsInput :IForm[];
  maxLength: number = 20;
  // Фукнция, которая будет обрезаннаю возвращать строку, с максимальной длинной
  shortString(str: string): string {
    if (str.length > this.maxLength) {
      return str.slice(0, this.maxLength) + '...';
    }
    return str;
  }

  constructor() {
  }
  ngOnInit(): void {
  }
}
