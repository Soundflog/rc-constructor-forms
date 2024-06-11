import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {InterpretationService} from "../../services/InterpretationService";
import {IScale} from "../../models/IScale";
import {catchError, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ScaleService} from "../../services/ScaleService";
import {IInterpretation} from "../../models/IInterpretation";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";

@Component({
  selector: 'app-scale-constructor-page',
  templateUrl: './scale-constructor-page.component.html',
  styleUrls: ['./scale-constructor-page.component.less'],
  providers: [
    tuiInputNumberOptionsProvider({
      decimal: 'always',
      step: 1,
      min: 1,
      max: 100,
    }),
  ],
})
export class ScaleConstructorPageComponent implements OnInit {
  idFromRoute : number;
  interpretation$: Observable<IScaleInterpretationResponse>;
  defaultInterpretation: IScaleInterpretationResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private interpretationService: InterpretationService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idFromRoute = params['scale_id'];
      console.log(this.idFromRoute);
      if (this.idFromRoute){
        this.interpretation$ = this.interpretationService.getById(this.idFromRoute)
          .pipe();
      } else{
        this.defaultInterpretation = {
          id: 0,
          description: '',
          name: 'Добавить шкалу',
          interpretations:[{
            id: 0,
            description: '',
            minValue: 0,
            maxValue: 100
          }]
        }
      }
    })
  }
}
