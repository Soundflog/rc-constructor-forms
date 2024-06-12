import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IInterpretation} from "../../models/IInterpretation";
import {tap} from "rxjs";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {InterpretationService} from "../../services/InterpretationService";
import {ScaleService} from "../../services/ScaleService";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";

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
  urlId: string | null = '';
  maxLengthTextArea = 220;
  interpretationFormGroup: FormGroup; // группа интерпретации

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    protected router: Router,
    private route: ActivatedRoute,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    this.interpretationFormGroup = this.fb.group({});
    this.route.paramMap.subscribe(params => {
      this.urlId = params.get('scale_id');
    });
  }


  routeToList() {
    this.router.navigate(['/scale/list']);
  }

  ngOnInit() {
    // FormGroup
    this.interpretationFormGroup = this.fb.group({
      id: [this.interpretation?.id],
      description: [this.interpretation?.description, Validators.required],
      name: [this.interpretation?.name, Validators.required],
      interpretations: this.fb.array([]),
    })
    this.interpretation?.interpretations.forEach((interpretation: IInterpretation) => {
      const newControl = this.fb.group({
        id: [interpretation.id],
        description: [interpretation.description, Validators.required],
        minValue: [interpretation.minValue, Validators.required],
        maxValue: [interpretation.maxValue, Validators.required]
      });
      const newField: IInterpretation = {
        id: interpretation.id,
        description: interpretation.description,
        minValue: interpretation.minValue,
        maxValue: interpretation.maxValue
      };
      (this.interpretationFormGroup.get("interpretations") as FormArray).push(newControl);
      this.fields.push(newField)
    })
    console.log("Fields: ", this.fields);
    console.log("FormGroup: ", this.interpretationFormGroup.value);
  }

  // Функция добавления вопроса в форму
  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    const newField: IInterpretation = {
      minValue: 1,
      maxValue: 20,
      description: "",
    }
    this.fields.splice(index + 1, 0, newField);
    const newControl = this.fb.group({
      description: ["Интерпритация", Validators.required],
      minValue: [1, Validators.required],
      maxValue: [20, Validators.required]
    });
    console.log("Add fields: ", this.fields)
    try {
      (this.interpretationFormGroup.get("interpretations") as FormArray).push(newControl);
      console.log("Add control:  ", this.interpretationFormGroup.value);
    } catch (e) {
      this.alerts.open('Ошибка добавления вопроса', {status: 'error'}).subscribe();
    }
  }

  deleteInterpretation(index: number) {
    this.fields.splice(index, 1);
    (this.interpretationFormGroup.get("interpretations") as FormArray).removeAt(index);
    this.alerts.open('Удалена интерпретация', {status: 'info'}).subscribe();
  }

  deleteScale() {
    if (this.interpretation?.id != null && this.interpretation?.id >= 0) {
      const id = this.interpretation.id;
      this.scaleService.deleteScale(id).pipe(
        tap(() => {
          this.alerts.open('Шкала удалена', {status: 'success'}).subscribe();
        })).subscribe(() => this.routeToList())
    }
  }

  onSubmit() {
    console.log("Inter FG after", this.interpretationFormGroup.value);
    if (this.interpretationFormGroup.valid) {
      if (this.interpretation?.id != null && this.interpretation?.id > 0) {
        this.interpretationService.update(this.interpretationFormGroup.value)
          .subscribe(() => this.routeToList())
      } else {
        this.interpretationService.create(this.interpretationFormGroup.value)
          .subscribe(() => this.routeToList())
      }
    }
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }
}
