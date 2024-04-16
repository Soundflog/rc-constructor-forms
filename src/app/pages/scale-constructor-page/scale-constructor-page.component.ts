import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {InterpretationService} from "../../services/InterpretationService";
import {IScale} from "../../models/IScale";
import {catchError, delay, filter, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ScaleService} from "../../services/ScaleService";
import {IInterpretation} from "../../models/IInterpretation";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";
import {TUI_DEFAULT_MATCHER} from "@taiga-ui/cdk";

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
  readonly search$ = new Subject<string | null>();
  scaleItems$: Observable<IScale[]>;
  interpretation$: Observable<IInterpretation>;
  idFromRoute : number;

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
    this.interpretationFormGroup = this.fb.group({});
  }

  // Dialog
  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  // search
  onSearchChange(searchQuery: string | null): void {
    this.search$.next(searchQuery);
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }


  ngOnInit() {
    const valueComboboxAddScale: IScale = {
      id: 0,
      name: 'Добавить шкалу',
      description: ''
    }

    this.scaleItems$ = this.search$.pipe(
      startWith(null), // Запускаем запрос при инициализации компонента
      switchMap((searchQuery) =>
        this.scaleService.getScales(searchQuery).pipe(
          catchError((error) => {
            // Обработка ошибок, если необходимо
            console.error('Error fetching scales:', error);
            return of([]);
          })
        )
      ),
      tap((items) => {
        // Добавляем элемент "Добавить шкалу" в начало списка
        items.unshift(valueComboboxAddScale);
        if (items.length === 0) {
          this.alerts
            .open('Нет шкал. Добавьте шкалы в настройках', { status: 'warning' })
            .subscribe();
        }
      })
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
                scale: inter.scale,
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
      scale: new FormGroup({
        id: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      }),
    })
    console.log(this.interpretationFormGroup.value);
  }

  onSubmit() {
    console.log(this.interpretationFormGroup.value);
    if (this.interpretationFormGroup.valid) {
      this.interpretationService.update(this.interpretationFormGroup.value).subscribe(
        () => {
          this.router.navigate(['/scale/list']);
        }
      )
    }
  }
}
