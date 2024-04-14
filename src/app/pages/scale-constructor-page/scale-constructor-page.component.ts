import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {InterpretationService} from "../../services/InterpretationService";
import {IScale} from "../../models/IScale";
import {Observable, tap} from "rxjs";
import {ScaleService} from "../../services/ScaleService";

@Component({
  selector: 'app-scale-constructor-page',
  templateUrl: './scale-constructor-page.component.html',
  styleUrls: ['./scale-constructor-page.component.less']
})
export class ScaleConstructorPageComponent implements OnInit {
  interpretationFormGroup : FormGroup;
  scaleItems$: Observable<IScale[]>;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private router: Router,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService
    ) {
    this.interpretationFormGroup = this.fb.group({});
  }

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  ngOnInit() {
    // Добавить строчку в dropdown для выбора добавления шкалы в настройках
    this.scaleItems$ = this.scaleService.getScales().pipe(
      tap(items => {
        if (items.length === 0) {
          this.alerts.open('Нет шкал. Добавьте шкалы в настройках', {status: 'warning'})
            .subscribe();
        }
      })
    );
  }
}
