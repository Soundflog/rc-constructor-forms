import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {InterpretationService} from "../../services/InterpretationService";
import {IScale} from "../../models/IScale";
import {Observable, tap} from "rxjs";
import {ScaleService} from "../../services/ScaleService";
import {IInterpretation} from "../../models/IInterpretation";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";

@Component({
  selector: 'app-scale-constructor-page',
  templateUrl: './scale-constructor-page.component.html',
  styleUrls: ['./scale-constructor-page.component.less'],
  providers: [
    tuiInputNumberOptionsProvider({
      decimal: 'always',
      step: 1,
      min: 1,
      max: 20,
    }),
  ],
})
export class ScaleConstructorPageComponent implements OnInit {
  interpretationFormGroup : FormGroup;
  scaleItems$: Observable<IScale[]>;
  interpretation$: Observable<IInterpretation>;
  idFromRoute : number;
  selectedScale : boolean = false;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService
    ) {
    this.interpretationFormGroup = this.fb.group({});
  }

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;


  ngOnInit() {
    const valueComboboxAddScale = {
      id: -1,
      name: 'Добавить шкалу',
      description: ''
    }

    this.scaleItems$ = this.scaleService.getScales().pipe(
      tap(items => {
        items.unshift(valueComboboxAddScale);
        if (items.length === 0) {
          this.alerts.open('Нет шкал. Добавьте шкалы в настройках', {status: 'warning'})
            .subscribe();
        }
      }),
    );

    this.activatedRoute.params.subscribe(params => {
      this.idFromRoute = params['scale_id'];
      if (this.idFromRoute) {
        this.interpretation$ = this.interpretationService.getById(this.idFromRoute).pipe(
          tap(inter => {
            if (inter) {
              this.interpretationFormGroup.patchValue({
                description: inter.description,
                minValue: inter.minValue,
                maxValue: inter.maxValue,
                scaleId: inter.scale,
              })
              this.interpretationFormGroup.addControl("id", new FormControl(inter.id));
            }
          })
        );
      }
    }).unsubscribe();

    this.interpretationFormGroup = this.fb.group({
      description: new FormControl('', Validators.required),
      minValue: new FormControl(0, Validators.required),
      maxValue: new FormControl(20, Validators.required),
      scaleId: new FormGroup({
        id: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        disabled: new FormControl(false),
      }),
    })
    console.log(this.interpretationFormGroup.value);
  }

  addScale() {
    console.log(this.interpretationFormGroup.value);
  }

  onSubmit() {
    console.log(this.interpretationFormGroup.value);
    if (this.interpretationFormGroup.valid) {
      this.interpretationService.create(this.interpretationFormGroup.value).subscribe(
        () => {
          this.router.navigate(['/scale/list']);
        }
      )
    }
  }
}
