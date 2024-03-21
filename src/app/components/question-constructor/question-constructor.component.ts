import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {FieldInterface} from 'src/app/models/form/field.interface';
import {ComboTypeQuestion} from "../../models/form/comboTypeQuestion.interface";
import {QuestionType} from "../../models/form/questionType.enum";
import {tuiArrayRemove} from "@taiga-ui/cdk";
import {IForm} from "../../models/IForm";

@Component({
  selector: 'app-question-constructor',
  templateUrl: './question-constructor.component.html',
  styleUrls: ['./question-constructor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionConstructorComponent implements OnInit {
  @Input() anketa: IForm;
  // Данные для отправки на сервер
  mainQuestionsFG: FormGroup; // questions form group
  variantsFG: FormGroup; // variants form group
  questionsFG: FormGroup; // variants form group
  // Tiles
  order = new Map();

  comboBoxFields: ComboTypeQuestion[] = [
    {value: 'Один из списка', type: QuestionType.SINGLE_CHOICE},
    {value: 'Несколько из списка', type: QuestionType.MULTI_CHOICE},
    {value: 'Шкала', type: QuestionType.SCALE},
  ]

  // Данные для отображения вопросов
  fields: FieldInterface[] = [];

  readonly comboBoxStringify = (item: ComboTypeQuestion): string =>
    `${item.value}`;

  ngOnInit(): void {
    // Добавление FormControl для каждого вопроса в форме
    if (this.anketa.questions.length === 0) {
      this.variantsFG = this.fb.group({
        content: new FormControl("Вариант 1", Validators.required),
        score: new FormControl(5.00, Validators.required)
      })

      this.questionsFG = this.fb.group({
        content: new FormControl("Введите текст", Validators.required),
        type: this.comboBoxFields[0],
        variants: this.fb.array([
          this.variantsFG,
        ]),
      });

      this.mainQuestionsFG = this.fb.group({});
      this.mainQuestionsFG.addControl('questions_0', this.questionsFG);
      this.fields.push({
        name: 'questions_0',
        content: 'Введите текст',
        type: new FormControl(this.comboBoxFields[0]),
        variants: [
          {
            content: 'Вариант 1',
            score: 5.00
          }
        ]
      })
    } else {
      this.anketa.questions.forEach((question, index) => {
        const questionGroup = this.fb.group({
          content: [question.content, Validators.required],
          type: [question.type, Validators.required],
          variants: this.fb.array([])
        });
        question.variants.forEach(variant => {
          (questionGroup.get('variants') as FormArray).push(
            this.fb.group({
              content: [variant.content, Validators.required],
              score: [variant.score, Validators.required],
            })
          );
        });

        this.fields.push({
          name: `questions_${index}`,
          content: question.content,
          type: new FormControl(
            this.comboBoxFields.find(item => {
              return item.type === question.type
            })
          ),
          variants: question.variants.map(v => ({
            content: v.content,
            score: v.score
          }))
        })
        this.mainQuestionsFG.addControl(`questions_${index}`, questionGroup);
      });
    }
  }

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
  ) {
    this.mainQuestionsFG = this.fb.group({});
    this.variantsFG = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(5.00, Validators.required)
    })
  }

  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    const newField = {
      name: 'questions_' + this.fields.length,
      content: 'Введите текст',
      type: new FormControl(this.comboBoxFields[0]),
      variants: [
        {
          content: 'Вариант 1',
          score: 5.00
        }],
    }
    this.fields.splice(index + 1, 0, newField);
    let newVariant = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(5.00, Validators.required)
    })
    let newQuestion = this.fb.group({
      content: new FormControl("Введите текст", Validators.required),
      type: this.comboBoxFields[0],
      variants: this.fb.array([
        newVariant
      ]),
    });
    try {
      this.mainQuestionsFG.addControl(newField.name, newQuestion);
    } catch (e) {
      console.log(e);
    }
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

  // Записать конечное значение типа вопроса в массив
  setValueTypeQuestionOnControl() {
    this.fields.forEach((field, i) => {
      // Проверить совпадают ли name и изменившийся вопрос
      if (field.name === 'questions_' + i) {
        const questionFG = this.mainQuestionsFG.get(field.name) as FormGroup;
        const comboBoxField = this.comboBoxFields.find(item => item === field.type.value);
        if (comboBoxField) {
          questionFG.controls['type'].setValue(comboBoxField.type);
        }
      }
    })
  }

  // Функция удаления варианта из массива
  removeVariant(questionIndex: number, variantIndex: number) {
    const questions = (this.mainQuestionsFG.get('questions_' + questionIndex) as FormGroup);
    const variants = questions.get('variants') as FormArray;
    if (variants.length > 1) {
      variants.removeAt(variantIndex);
      // удалить из fields
      this.fields[questionIndex].variants.splice(variantIndex, 1);
      this.alerts.open('Удален вариант').subscribe();
    }
  }

  // Функция добавления варианта в массив
  addVariant(questionIndex: number) {
    const questions = (this.mainQuestionsFG.get('questions_' + questionIndex) as FormGroup);
    const variants = questions.get('variants') as FormArray;
    let newVariant = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(5.00, Validators.required)
    })
    variants.push(newVariant);

    // добавить в fields
    this.fields[questionIndex].variants.push({
      content: 'Вариант 1',
      score: 5.00,
    });
    this.alerts.open('Вариант добавлен').subscribe();
  }

  // Функция копирование варианта из массива
  copyVariant(questionIndex: number, variantIndex: number) {
    const questions = (this.mainQuestionsFG.get('questions_' + questionIndex) as FormGroup);
    const variants = questions.get('variants') as FormArray;
    const variant = variants.at(variantIndex) as FormGroup;
    variants.push(variant);
    // добавить в fields
    this.fields[questionIndex].variants.push(variant.value);
    console.log(variant.value);
    this.alerts.open('Вариант добавлен').subscribe();
  }

  onSubmit() {
    // Перед отправкой на сервер
    // Удалить поле name у fields[]
    this.setValueTypeQuestionOnControl();

    console.log(this.mainQuestionsFG.value);
    console.log(this.fields);
  }

  protected readonly QuestionType = QuestionType;
}
