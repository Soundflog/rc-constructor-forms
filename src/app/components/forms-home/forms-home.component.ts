import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {forms} from "../../data/forms";
import {FormService} from "../../services/FormService";
import {IForm} from "../../models/IForm";

@Component({
  selector: 'app-forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsHomeComponent implements OnInit{
  forms = forms;
  maxLength: number = 20;
  // Фукнция, которая будет обрезаннаю возвращать строку, с максимальной длинной
  shortString(str: string): string {
    if (str.length > this.maxLength) {
      return str.slice(0, this.maxLength) + '...';
    }
    return str;
  }

  constructor(private formService: FormService) {
  }
  ngOnInit(): void {
    this.formService.getAll().subscribe(data => {
      console.log(data);
      this.forms.push(...data);
    })
  }
}
