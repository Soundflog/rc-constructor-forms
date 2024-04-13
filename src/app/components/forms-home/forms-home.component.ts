import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IForm} from "../../models/IForm";
import {FormControl, FormGroup} from '@angular/forms';
import {filter} from "rxjs";

@Component({
  selector: 'app-forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsHomeComponent implements OnInit{
  @Input() formsInput :IForm[];
  maxLength: number = 20;

  readonly control = new FormControl();
  search : string;
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

  readonly stringify = (item: IForm): string =>
    `${this.shortString(item.name)}`;

}
