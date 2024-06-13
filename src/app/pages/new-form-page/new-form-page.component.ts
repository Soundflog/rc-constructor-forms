import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";
import {QuestionConstructorComponent} from "../../components/question-constructor/question-constructor.component";
import {FormService} from "../../services/FormService";
import {IForm} from "../../models/IForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ScaleService} from "../../services/ScaleService";
import {Observable, tap} from "rxjs";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";

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
  formDefault: IForm
  idFromRoute: number
  urlId: string | null = '';

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private scaleService: ScaleService,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    this.mainFG = this.fb.group({});
    this.activatedRoute.paramMap.subscribe(params => {
      this.urlId = params.get('form_id');
    });
  }

  ngOnInit(): void {
    this.scaleItems$ = this.scaleService.getScales(null).pipe(
      tap(items => {
        if (items.length === 0) {
          this.alerts.open('Нет шкал. Добавьте шкалы в настройках', {status: 'warning'}).subscribe();
        }
      })
    )

    this.activatedRoute.params.subscribe(params => {
      this.idFromRoute = params['form_id'];
      if (this.idFromRoute) {
        this.formById$ = this.formService.getById(this.idFromRoute).pipe(
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

  deleteForm() {
    if (this.urlId != null && this.urlId != "new" && Number(this.urlId) != 0)  {
      this.formService.deleteForm(Number(this.urlId)).subscribe(() => {
        this.alerts.open('Анкета удалена', {status: 'success'}).subscribe();
      })
      this.router.navigate([`/form/list`]);
    }
  }

  collectFormData() {
    this.questionConstructor.setValueTypeQuestionOnControl();
    let newQuestion = this.questionConstructor.mainQuestionsFG.controls
    this.mainFG.addControl("questions", this.fb.array([]));
    // Очищаем форму, избежать дублирования
    (this.mainFG.get("questions") as FormArray).clear()
    this.questionConstructor.fields.forEach((item, index) => {
      (this.mainFG.get("questions") as FormArray).push(newQuestion[index])
    })
  }

  onSubmitForm() {
    if (this.mainFG.valid) {
      this.collectFormData()
      const formData = this.mainFG.value;
      if (formData.id > 0) {
        this.formService.updateForm(formData).subscribe(form => {
          this.alerts.open('Данные сохранены', {status: 'success'}).subscribe();
          this.router.navigate([`/form/list`]).then(() => {
            window.location.reload()
          });
        })
      } else {
        this.formService.createForm(formData).subscribe(form => {
          this.alerts.open('Данные сохранены', {status: 'success'}).subscribe();
          this.mainFG.patchValue({id: form.id})
          this.router.navigate([`/form/list`]).then(() => {
            window.location.reload()
          });
        })
      }
    } else {
      this.alerts.open(`Не все поля заполнены`, {status: 'error'}).subscribe();
    }
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }
}
