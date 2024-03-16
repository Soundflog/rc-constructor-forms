import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {FieldInterface} from 'src/app/models/form/field.interface';
import {ComboTypeQuestion} from "../../models/form/comboTypeQuestion.interface";
import {QuestionType} from "../../models/form/questionType.enum";

@Component({
  selector: 'app-question-constructor',
  templateUrl: './question-constructor.component.html',
  styleUrls: ['./question-constructor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionConstructorComponent {
  questionsFG: FormGroup; // questions form group
  mainQuestionsFG: FormGroup; // questions form array
  variantsFG: FormGroup; // variants form group
  // Tiles
  order = new Map();

  fields: FieldInterface[] = [
    {
      name: 'questions_0',
      content: 'Введите текст',
      type: new FormControl(),
      variants: [
        {
          content: 'Вариант 1',
          score: 5.00,
        },
      ]
    }
  ];

  comboBoxFields: ComboTypeQuestion[] = [
    {value: 'Один из списка', type: QuestionType.SINGLE_CHOICE},
    {value: 'Несколько из списка', type: QuestionType.MULTI_CHOICE},
    {value: 'Шкала', type: QuestionType.SCALE},
  ]

  readonly comboBoxStringify = (item: ComboTypeQuestion): string =>
    `${item.value}`;

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
  ) {
    this.variantsFG = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(5.00, Validators.required)
    })

    this.questionsFG = this.fb.group({
      content: new FormControl("Введите текст", Validators.required),
      type: "",
      variants: this.fb.array([
        this.variantsFG,
      ]),
    });

    this.mainQuestionsFG = this.fb.group({});

    this.mainQuestionsFG.addControl('questions_0', this.questionsFG);

  }

  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    this.fields.splice(index + 1, 0,
      {
        name: 'questions_' + this.fields.length,
        content: 'Введите текст',
        type: new FormControl(),
        variants: [
          {
            content: 'Вариант 1',
            score: 5.00,
          }],
      });
    // this.questionsFG.addControl(this.fields[this.fields.length - 1].name, new FormControl(''));

    let newQuestion = this.fb.group({
      content: new FormControl("Введите текст", Validators.required),
      type: "",
      variants: this.fb.array([
        this.variantsFG,
      ]),
    });
    try{
      this.mainQuestionsFG.addControl(this.fields[this.fields.length - 1].name, newQuestion);
    }
    catch (e) {
      console.log(e);
    }
    // this.mainQuestionsFG.addControl('questions_' + index, newQuestion);
  }

  removeField(index: number) {
    if (this.fields[index]) {
      this.fields.splice(index, 1);
      this.alerts.open('Удалено поле').subscribe();
    } else {
      console.error('Поле не существует');
      this.alerts.open('Поле не существует').subscribe();
    }
  }
/*
  addInField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    // this.fields.
    this.questionsFG.addControl(this.fields[this.fields.length - 1].name, new FormControl(''));
  }*/

  /*removeProperties<T extends object>(obj: T, ...props: (keyof T)[]): Partial<T> {
    const newObj = {...obj };
    for (const prop of props) {
      delete newObj[prop];
    }
    return newObj;
  }*/

  // Записать конечное значение типа вопроса в массив
  setValueTypeQuestionOnControl() {
    this.fields.forEach((field, i) => {
      // Проверить совпадают ли name и изменившийся вопрос
      if (field.name === 'questions_' + i) {
        const questionFG = this.mainQuestionsFG.get(field.name) as FormGroup;
        const comboBoxField = this.comboBoxFields.find(item => item === field.type.value);
        if (comboBoxField) {
          questionFG.controls['type'].setValue(comboBoxField.type);
        } else {
          questionFG.controls['type'].setValue(this.comboBoxFields[0].type);
        }
      }
    })
  }

  onSubmit() {
    // Перед отправкой на сервер
    // Удалить поле name у fields[]
    // Пример :
    /*const index = this.fields.indexOf('name', 0);
    if (index > -1) {
      this.fields.splice(index, 1)
    }*/

    // console.log(this.fields[0].type.value);
    this.setValueTypeQuestionOnControl();
    console.log(this.mainQuestionsFG.value);
    console.log(this.fields);
    // console.log(this.fields)
  }

  protected readonly QuestionType = QuestionType;
}
