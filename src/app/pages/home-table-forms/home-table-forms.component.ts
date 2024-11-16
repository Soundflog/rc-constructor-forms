import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, Subject, switchMap} from "rxjs";
import {IForm} from "../../models/IForm";
import {FormService} from "../../services/FormService";
import {forms} from "../../data/forms";

@Component({
  selector: 'app-home-table-forms',
  templateUrl: './home-table-forms.component.html',
  styleUrls: ['./home-table-forms.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTableFormsComponent implements OnInit{
  forms$ : Observable<IForm[]>;
  formsStatic : IForm[] = forms
  // forms$: Subject<IForm[]>;

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.forms$ = this.formService.getAll()
    // this.forms$.subscribe(this.formsStatic);
  }
}
