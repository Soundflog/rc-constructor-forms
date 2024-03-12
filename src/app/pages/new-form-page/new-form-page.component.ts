import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ComboField, Field} from "../../models/Field";
import {TuiAlertService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";

@Component({
  selector: 'app-new-form-page',
  templateUrl: './new-form-page.component.html',
  styleUrls: ['./new-form-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFormPageComponent implements OnInit {

  questionsFG: FormGroup;
  mainFG: FormGroup;
  // Неизменяемые поля
  notEditableFields: Field[] = [
    {name: 'rfield0', type: 'text', label: 'Новая анкета', size: 'l', relationBox: new FormControl()},
    {name: 'rfield1', type: 'text', label: 'Описание', size: 'm', relationBox: new FormControl()},
  ];
  // Шкала
  readonly scaleControl = new FormControl();

  readonly scaleItems = scales;
  // Tiles
  order = new Map();

  readonly scaleChooseStringify = (item: IScale): string =>
    `${item.name}`;

  // Изменяемые поля
  fields: Field[] = [
    {name: 'field0', type: 'text', label: 'Введите текст', size: 'l', relationBox: new FormControl()},
    {name: 'field1', type: 'email', label: 'Введите email', size: 'l', relationBox: new FormControl()},
    {name: 'field2', type: 'number', label: 'Введите число', size: 'l', relationBox: new FormControl()},
  ];

  readonly comboBoxControl = new FormControl();
  comboBoxFields: ComboField[] = [
    {value: 'Один из списка', type: 'one-to-many'},
    {value: 'Несколько из списка', type: 'many-to-many'},
    {value: 'Шкала', type: 'scale'},
  ]

  readonly comboBoxStringify = (item: ComboField): string =>
    `${item.value}`;


  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
  ) {
    this.questionsFG = this.fb.group({});
    this.mainFG = this.fb.group({});
  }

  ngOnInit(): void {
    this.questionsFG = this.fb.group({
      field0: new FormControl('', Validators.required),
      field1: new FormControl('', Validators.required),
      field2: new FormControl('', Validators.required),
    });
    this.mainFG = this.fb.group({
      rfield0: new FormControl('', Validators.required),
      rfield1: new FormControl('', Validators.required),
      rfield2: new FormControl('', Validators.required),
    })
    console.log(this.questionsFG);
  }

  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    this.fields.splice(index + 1, 0, {
      name: 'field' + this.fields.length,
      type: 'text',
      label: 'Введите текст',
      size: 'l',
      relationBox: new FormControl(this.comboBoxFields[0].value)
    });
    this.questionsFG.addControl(this.fields[this.fields.length - 1].name, new FormControl(''));
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

  onSubmit() {

    console.log(this.questionsFG);
  }

  onSubmitForm() {
    this.mainFG.addControl(this.scaleControl.value, new FormControl(this.scaleControl.value, Validators.required));
    console.log(this.mainFG.value);
  }
}
