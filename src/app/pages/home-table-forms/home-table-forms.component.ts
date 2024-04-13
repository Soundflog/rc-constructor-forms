import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IForm} from "../../models/IForm";
import {FormService} from "../../services/FormService";

@Component({
  selector: 'app-home-table-forms',
  templateUrl: './home-table-forms.component.html',
  styleUrls: ['./home-table-forms.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTableFormsComponent implements OnInit{
  forms$ : Observable<IForm[]>;
  constructor(private formService: FormService) {
  }
  ngOnInit(): void {
    this.forms$ = this.formService.forms$;
  }
}
