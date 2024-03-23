import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";
import {QuestionConstructorComponent} from "../../components/question-constructor/question-constructor.component";
import {FormService} from "../../services/FormService";
import {IForm} from "../../models/IForm";
import {ActivatedRoute} from "@angular/router";

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
  readonly scaleItems = scales;

  formById: IForm;

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private formService: FormService,
    private route: ActivatedRoute
  ) {
    this.mainFG = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.formService.getById(id).subscribe(res => {
          this.formById = res
        });
      } else {
        this.formById = {
          name: 'Название формы',
          scale_id: scales[0],
          description: 'Описание формы',
          questions: []
        }
      }
    })

    this.mainFG = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      scale: new FormControl(scales[0], Validators.required)
    })
  }

  onSubmitForm() {
    let newQuestion = this.questionConstructor.mainQuestionsFG.controls
    this.mainFG.addControl("questions", this.fb.array([]));
    this.questionConstructor.fields.forEach((item, index) => {
      (this.mainFG.get("questions") as FormArray).push(newQuestion[index])
    })
    if (this.mainFG.valid) {
      console.log(this.mainFG.value);
      const formData = this.mainFG.value;
      this.formService.createForm(formData).subscribe(res => {
        this.alerts.open(`Данные успешно сохранены`, {status: 'success'});
        console.log(res);
      }, error => {
        console.log(error);
        this.alerts.open(`Ошибка при сохранении данных`, {status: 'error'});
      });
    } else {
      this.alerts.open(`Не все поля заполнены`, {status: 'error'});
    }
  }
}
