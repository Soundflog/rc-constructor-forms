import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";
import {QuestionConstructorComponent} from "../../components/question-constructor/question-constructor.component";
import {FormService} from "../../services/FormService";
import {IForm} from "../../models/IForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ScaleService} from "../../services/ScaleService";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-new-form-page',
  templateUrl: './new-form-page.component.html',
  styleUrls: ['./new-form-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFormPageComponent implements OnInit {
  @ViewChild(QuestionConstructorComponent) questionConstructor: QuestionConstructorComponent;

  mainFG: FormGroup;
  // Шкала
  scaleItems$: Observable<IScale[]>;

  formById$: Observable<IForm>;
  formDefault : IForm
  isNew = false

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private scaleService: ScaleService,
    private router: Router
  ) {
    this.mainFG = this.fb.group({});
  }

  ngOnInit(): void {
    this.scaleItems$ = this.scaleService.getScales().pipe(
      tap(items => {
        if (items.length === 0) {
          this.alerts.open('Нет шкал. Добавьте шкалы в настройках', {status: 'warning'}).subscribe();
        }
      })
    )

    this.activatedRoute.params.subscribe(params => {
      const id = +params['form_id'];
      if (id) {
        this.formById$ = this.formService.getById(id).pipe(
          tap(form => {
            if (form) {
              this.mainFG.patchValue({
                name: form.name,
                description: form.description,
                scaleId: form.scaleId
              })
              this.mainFG.addControl("id", new FormControl(form.id));
            }
          })
        )
        this.isNew = false
      }else{
        this.isNew = true
      }
    })

    this.formDefault = {
      name: 'Название формы',
      scaleId: scales[0],
      description: 'Описание формы',
      questions: []
    }
    this.mainFG = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      scaleId: new FormControl(),
    })
  }

  onSubmitForm() {
    if (this.mainFG.valid) {
      this.questionConstructor.setValueTypeQuestionOnControl();
      let newQuestion = this.questionConstructor.mainQuestionsFG.controls
      this.mainFG.addControl("questions", this.fb.array([]));
      // Очищаем форму, избежать дублирования
      (this.mainFG.get("questions") as FormArray).clear()
      this.questionConstructor.fields.forEach((item, index) => {
        (this.mainFG.get("questions") as FormArray).push(newQuestion[index])
      })
      const formData = this.mainFG.value;
      console.log(formData, "From FormGroup");
      this.formService.createForm(formData).subscribe(form => {
        this.alerts.open('Данные сохранены', {status:'success'}).subscribe();
        this.mainFG.patchValue({id: form.id})
        this.router.navigate([`/${form.id}`]);
        console.log(form, "From SERVER");
      })
    } else {
      this.alerts.open(`Не все поля заполнены`, {status: 'error'}).subscribe();
    }
  }
}
