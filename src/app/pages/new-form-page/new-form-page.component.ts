import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {scales} from "../../data/scales";
import {IScale} from "../../models/IScale";
import {RequiredFieldInterface} from "../../models/form/requiredField.interface";

@Component({
  selector: 'app-new-form-page',
  templateUrl: './new-form-page.component.html',
  styleUrls: ['./new-form-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFormPageComponent implements OnInit {

  mainFG: FormGroup;
  // Неизменяемые поля
  notEditableFields: RequiredFieldInterface[] = [
    {name: 'rfield0', type: 'text',
      label: 'Новая анкета', size: 'l'
    },
    {name: 'rfield1', type: 'text',
      label: 'Описание', size: 'm'
    },
  ];
  // Шкала
  readonly scaleControl = new FormControl();
  readonly scaleItems = scales;

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
      rfield0: new FormControl('', Validators.required),
      rfield1: new FormControl('', Validators.required),
      rfield2: new FormControl('', Validators.required),
    })
  }

  onSubmitForm() {
    this.mainFG.addControl(this.scaleControl.value, new FormControl(this.scaleControl.value, Validators.required));
    console.log(this.mainFG.value);
  }
}
