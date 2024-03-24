import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {FieldInterface} from 'src/app/models/form/field.interface';
import {ComboTypeQuestion} from "../../models/form/comboTypeQuestion.interface";
import {QuestionType} from "../../models/form/questionType.enum";
import {IForm} from "../../models/IForm";
import {tuiInputCountOptionsProvider} from "@taiga-ui/kit";

@Component({
  selector: 'app-question-constructor',
  templateUrl: './question-constructor.component.html',
  styleUrls: ['./question-constructor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputCountOptionsProvider({
      icons: {
        up: 'tuiIconChevronUp',
        down: 'tuiIconChevronDown',
      },
      appearance: 'secondary',
      step: 1,
      min: 1,
      max: 20,
    }),
  ],
})
export class QuestionConstructorComponent implements OnInit {
  @Input() anketa: IForm;
  // Данные для отправки на сервер
  mainQuestionsFG: FormGroup; // questions form group
  variantsFG: FormGroup; // variants form group
  questionsFG: FormGroup; // variants form group

  // Заглушки
  readonly radioControl = new FormControl();
  readonly checkboxControl = new FormControl();

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
        score: new FormControl(1.00, Validators.required)
      })

      this.questionsFG = this.fb.group({
        content: new FormControl("Вопрос 1", Validators.required),
        type: this.comboBoxFields[0],
        required: false,
        variants: this.fb.array([
          this.variantsFG,
          this.fb.group({
            content: new FormControl("Вариант 2", Validators.required),
            score: new FormControl(10.00, Validators.required)
          })
        ]),
      });

      this.mainQuestionsFG = this.fb.group({});
      this.mainQuestionsFG.addControl('0', this.questionsFG);
      this.fields.push({
        name: '0',
        content: 'Введите текст',
        type: new FormControl(this.comboBoxFields[0]),
        variants: [
          {
            content: 'Вариант 1',
            score: 5.00
          },
          {
            content: 'Вариант 2',
            score: 10.00
          }
        ]
      })
    } else {
      this.anketa.questions.forEach((question, index) => {
        const questionGroup = this.fb.group({
          id: [question.id],
          content: [question.content, Validators.required],
          type: [question.type, Validators.required],
          required: [question.required || false, Validators.required],
          variants: this.fb.array([])
        });
        question.variants.forEach(variant => {
          (questionGroup.get('variants') as FormArray).push(
            this.fb.group({
              id: [variant.id],
              content: [variant.content, Validators.required],
              score: [variant.score, Validators.required],
            })
          );
        });

        this.fields.push({
          id: question.id,
          name: `${index}`,
          content: question.content,
          type: new FormControl(
            this.comboBoxFields.find(item => {
              return item.type === question.type
            })
          ),
          variants: question.variants.map(v => ({
            id: v.id,
            content: v.content,
            score: v.score
          }))
        })
        this.mainQuestionsFG.addControl(`${index}`, questionGroup);
      });
    }
  }

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder
  ) {
    this.mainQuestionsFG = this.fb.group({});
    this.variantsFG = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(5.00, Validators.required)
    })
  }

  // Функция добавления вопроса в форму
  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    const newIndexQuestion = this.fields.length+ 1;
    const newField = {
      name: `${this.fields.length}`,
      content: 'Вопрос ' + (newIndexQuestion),
      type: new FormControl(this.comboBoxFields[0]),
      variants: [
        {
          content: 'Вариант 1',
          score: 5.00
        },
        {
          content: 'Вариант 2',
          score: 10.00
        }
      ],
    }
    this.fields.splice(index + 1, 0, newField);
    const newVariant = this.fb.group({
      content: new FormControl("Вариант 1", Validators.required),
      score: new FormControl(1.00, Validators.required)
    })
    const newQuestion = this.fb.group({
      content: new FormControl("Вопрос " + (newIndexQuestion + 1), Validators.required),
      type: this.comboBoxFields[0],
      required: false,
      variants: this.fb.array([
        newVariant,
        this.fb.group({
          content: new FormControl("Вариант 2", Validators.required),
          score: new FormControl(10.00, Validators.required)
        })
      ]),
    });
    try {
      this.mainQuestionsFG.addControl(newField.name, newQuestion);
      this.updateControlsInMainQuestionsFG(); // переименовать вопросы в массиве
    } catch (e) {
      this.alerts.open('Ошибка добавления вопроса', {status:  'error'}).subscribe();
    }
  }

  private updateControlsInMainQuestionsFG() {
    const newControls: { [key: string]: FormGroup } = {};
    this.fields.forEach((field, index) => {
      const control = this.mainQuestionsFG.get(field.name) as FormGroup;
      newControls[`${index}`] = control;
    });
    this.mainQuestionsFG = this.fb.group(newControls);
  }

  // Функция удаления вопроса из массива
  removeField(index: number) {
    if (this.fields[index]) {
      console.log(this.mainQuestionsFG.value, 'До удаления field')
      this.fields.splice(index, 1);
      // удалить из mainQuestionsFG
      this.mainQuestionsFG.removeControl(`${index}`);
      this.alerts.open('Удалено поле').subscribe();
      console.log(this.mainQuestionsFG.value, 'После удаления field')
    } else {
      this.alerts.open('Поле не существует').subscribe();
    }
  }

  // Функция удаления варианта из массива
  removeVariant(questionIndex: number, variantIndex: number) {
    const questions = (this.mainQuestionsFG.get(`${questionIndex}`) as FormGroup);
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
    const questions = (this.mainQuestionsFG.get(`${questionIndex}`) as FormGroup);
    const variants = questions.get('variants') as FormArray;
    let indexVariant = variants.length + 1;
    let newVariant = this.fb.group({
      content: new FormControl("Вариант " + indexVariant, Validators.required),
      score: new FormControl(5.00, Validators.required)
    })
    variants.push(newVariant);

    // добавить в fields
    this.fields[questionIndex].variants.push({
      content: 'Вариант ' + indexVariant,
      score: 5.00,
    });
    this.alerts.open('Вариант добавлен').subscribe();
  }

  // Функция копирование варианта из массива
  copyVariant(questionIndex: number, variantIndex: number) {
    const questions = (this.mainQuestionsFG.get(`${questionIndex}`) as FormGroup);
    const variants = questions.get('variants') as FormArray;
    const variant = variants.at(variantIndex) as FormGroup;
    let newVariant = this.fb.group({
      content: new FormControl((variant.get('content') as FormControl).value, Validators.required),
      score: new FormControl((variant.get('score') as FormControl).value, Validators.required)
    })
    variants.push(newVariant);
    // добавить в fields
    this.fields[questionIndex].variants.push(variant.value);
    this.alerts.open('Вариант добавлен').subscribe();
  }

  // Записать конечное значение типа вопроса в массив
  setValueTypeQuestionOnControl() {
    this.fields.forEach((field, i) => {
      // Проверить совпадают ли name и изменившийся вопрос
      if (field.name === `${i}`) {
        const questionFG = this.mainQuestionsFG.get(field.name) as FormGroup;
        const comboBoxField = this.comboBoxFields.find(item => item === field.type.value);
        if (comboBoxField) {
          questionFG.controls['type'].setValue(comboBoxField.type);
        }
      }
    })
  }

  onSubmit() {
    // Перед отправкой на сервер
    this.setValueTypeQuestionOnControl();
  }

  protected readonly QuestionType = QuestionType;
}
