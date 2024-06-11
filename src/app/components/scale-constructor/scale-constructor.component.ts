import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IInterpretation} from "../../models/IInterpretation";
import {catchError, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {IScale} from "../../models/IScale";
import {TuiAlertService} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {InterpretationService} from "../../services/InterpretationService";
import {ScaleService} from "../../services/ScaleService";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";

@Component({
  selector: 'app-scale-constructor',
  templateUrl: './scale-constructor.component.html',
  styleUrls: ['./scale-constructor.component.less'],
  providers: [
    tuiInputNumberOptionsProvider({
      decimal: 'always',
      step: 1,
      min: 1,
      max: 100,
    }),
  ],
})
export class ScaleConstructorComponent implements OnInit {
  @Input() interpretation: IScaleInterpretationResponse | null;

  fields: IInterpretation[] = []

  interpretationFormGroup: FormGroup; // группа интерпретации
  scaleFromGroup: FormControl; // выбор шкалы
  scaleDefaultCombobox: IScale = {
    id: 0,
    name: 'Добавить шкалу',
    description: ''
  }
  readonly search$ = new Subject<string | null>(); // событие поиска
  scaleItems$: Observable<IScale[]>; // список шкал

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private router: Router,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService,
  ) {
    this.interpretationFormGroup = this.fb.group({});
    this.scaleFromGroup = new FormControl;
  }

  // search
  onSearchChange(searchQuery: string | null): void {
    this.search$.next(searchQuery);
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  routeToList() {
    this.router.navigate(['/scale/list']);
  }

  ngOnInit() {
    this.scaleItems$ = this.search$.pipe(
      startWith(null), // Запускаем запрос при инициализации компонента
      switchMap((searchQuery) =>
        this.scaleService.getScales(searchQuery).pipe(
          catchError((error) => {
            console.error('Error fetching scales:', error);
            return of([]);
          })
        )
      ),
      tap((items) => {
        // Добавляем элемент "Добавить шкалу" в начало списка
        items.unshift(this.scaleDefaultCombobox);
        if (items.length === 0) {
          this.alerts
            .open('Нет шкал. Добавьте шкалы в настройках', {status: 'warning'})
            .subscribe();
        }
      })
    );

    this.scaleFromGroup = new FormControl(this.interpretation);
    this.interpretationFormGroup = this.fb.group({
      id: [this.interpretation?.id],
      description: [this.interpretation?.description, Validators.required],
      name: [this.interpretation?.name, Validators.required],
      interpretations: this.fb.array([
        this.interpretation?.interpretations.map((item) =>{
          this.fb.group({
              description: [item.description, Validators.required],
              minValue: [item.minValue, Validators.required],
              maxValue: [item.maxValue, Validators.required],
              scale: [item.scale, Validators.required],
            })
          })
      ]),
    })
  }

  // Функция добавления вопроса в форму
  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    const newIndexQuestion = this.fields.length+ 1;
    const newField:IInterpretation = {
      minValue: 1,
      maxValue: 20,
      description: "",
    }
    this.fields.splice(index + 1, 0, newField);
    const newControl = this.fb.group({
      description: new FormControl("", Validators.required),
      minValue: new FormControl(1, Validators.required),
      maxValue: new FormControl(20, Validators.required),
      scale: new FormControl(this.scaleFromGroup.value, Validators.required),
    })
    console.log(this.fields)
    // const newVariant = this.fb.group({
    //   content: new FormControl("Вариант 1", Validators.required),
    //   score: new FormControl(1.00, Validators.required)
    // })
    // const newQuestion = this.fb.group({
    //   content: new FormControl("Вопрос " + (newIndexQuestion + 1), Validators.required),
    //   type: this.comboBoxFields[0],
    //   required: false,
    //   variants: this.fb.array([
    //     newVariant,
    //     this.fb.group({
    //       content: new FormControl("Вариант 2", Validators.required),
    //       score: new FormControl(10.00, Validators.required)
    //     })
    //   ]),
    // });
    try {
      // this.interpretationFormGroup.addControl(this.fields.length, newControl);
    } catch (e) {
      this.alerts.open('Ошибка добавления вопроса', {status:  'error'}).subscribe();
    }
  }

  changeScaleCombobox() {
    this.interpretationFormGroup.get("scale")?.setValue(this.scaleFromGroup.value);
    if (this.scaleFromGroup.value == null) {
      this.scaleFromGroup = new FormControl(this.scaleDefaultCombobox);
    }
  }

  deleteInterpretation() {
    const id = this.interpretation?.id;
    if (id != null && id >= 0) {
      this.interpretationService.delete(id)
        .subscribe(() => this.routeToList())
    } else {
      this.alerts.open('Произошла ошибка', {status: 'warning'});
    }
  }

  onSubmit() {
    console.log("Inter FG after", this.interpretationFormGroup.value);
    console.log("Scale FG after", this.scaleFromGroup.value);
    if (this.interpretationFormGroup.valid && this.scaleFromGroup.valid) {
      if (this.interpretation?.id != null && this.interpretation?.id > 0) {
        this.interpretationService.update(this.interpretationFormGroup.value)
          .subscribe(() => this.routeToList())
      } else {
        if (this.scaleFromGroup.value.id == 0)  {
          this.scaleFromGroup.value.id = null;
        }
        this.interpretationService.create(this.interpretationFormGroup.value)
          .subscribe(() => this.routeToList())
      }
    }
  }
}
