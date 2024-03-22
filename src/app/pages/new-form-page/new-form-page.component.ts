import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";
import {RequiredFieldInterface} from "../../models/form/requiredField.interface";
import {forms} from "../../data/forms";
import {QuestionConstructorComponent} from "../../components/question-constructor/question-constructor.component";

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
  // readonly scaleControl = new FormControl();
  readonly scaleItems = scales;

  readonly forms = forms;

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
  ) {
    this.mainFG = this.fb.group({});
  }

  ngOnInit(): void {
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
      this.alerts.open(`Данные успешно сохранены`, {status:'success'});
    }else{
      this.alerts.open(`Не все поля заполнены`, {status:'error'});
    }
  }
}
