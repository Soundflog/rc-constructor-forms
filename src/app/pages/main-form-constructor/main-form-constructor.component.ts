import {Component, OnInit} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {IScale} from "../../models/IScale";
import {IForm} from "../../models/IForm";
import {ScaleService} from "../../services/ScaleService";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../services/FormService";
import {FormControl} from "@angular/forms";
import {scales} from "../../data/scales";

@Component({
  selector: 'app-main-form-constructor',
  templateUrl: './main-form-constructor.component.html',
  styleUrls: ['./main-form-constructor.component.less']
})
export class MainFormConstructorComponent implements OnInit {

  // formById$: Observable<IForm>;
  formById$: Observable<IForm | undefined>;
  formDefault: IForm
  idFromRoute: number
  urlId: string | null = '';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idFromRoute = params['form_id'];
      if (this.idFromRoute) {
        this.formById$ = this.formService.getAll().pipe(
          map(form => form.find(f => f.id === this.idFromRoute))
        )
      } else{
        this.formDefault = {
          id: 0,
          name: 'Название формы',
          scaleId: scales[0],
          description: 'Описание формы',
          questions: []
        }
      }
    })
  }

}
