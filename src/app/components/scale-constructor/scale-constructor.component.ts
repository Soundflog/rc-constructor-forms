import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IInterpretation} from "../../models/IInterpretation";
import {catchError, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {IScale} from "../../models/IScale";
import {TuiAlertService} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {InterpretationService} from "../../services/InterpretationService";
import {ScaleService} from "../../services/ScaleService";
import {tuiInputNumberOptionsProvider} from "@taiga-ui/kit";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";

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

  interpretationFormGroup: FormGroup; // группа интерпретации

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private router: Router,
    private interpretationService: InterpretationService,
    private scaleService: ScaleService,
  ) {
    this.interpretationFormGroup = this.fb.group({});
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
    this.interpretation?.interpretations.forEach((interpretation: IInterpretation, index) => {
      const newControl = this.fb.group({
        description: [interpretation.description, Validators.required],
        minValue: [interpretation.minValue, Validators.required],
        maxValue: [interpretation.maxValue, Validators.required],
        scale:  [interpretation.scale, Validators.required],
      });
      const newField: IInterpretation = {
        id: interpretation.id,
        description: interpretation.description,
        minValue: interpretation.minValue,
        maxValue: interpretation.maxValue,
        scale: interpretation.scale,
      };
      (this.interpretationFormGroup.get("interpretations") as FormArray).push(newControl);
      this.fields.push(newField)
    })
    console.log("Fields: ",this.fields);
    console.log("FormGroup: ", this.interpretationFormGroup.value);
  }

  // Функция добавления вопроса в форму
  addField(index: number): void {
    this.alerts.open('Добавлено поле').subscribe();
    const newIndexQuestion = this.fields.length+ 1;
    const newField:IInterpretation = {
      minValue: 1,
      maxValue: 20,
      description: "",
    }
    this.fields.splice(index + 1, 0, newField);
    const newControl = this.fb.group({
      description: ["Интерпритация", Validators.required],
      minValue: [1, Validators.required],
      maxValue: [20, Validators.required],
      scale: [this.interpretation, Validators.required],
    });
    console.log("Add fields: ", this.fields)
    try {
      (this.interpretationFormGroup.get("interpretations") as FormArray).push(newControl);
      console.log("Add control:  ", this.interpretationFormGroup.value);
    } catch (e) {
      this.alerts.open('Ошибка добавления вопроса', {status:  'error'}).subscribe();
    }
  }


  deleteInterpretation() {
    const id = this.interpretation?.id;
    if (id != null && id >= 0) {
      this.interpretationService.delete(id)
        .subscribe(() => this.routeToList())
    } else {
      this.alerts.open('Произошла ошибка', {status: 'warning'});
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
}
