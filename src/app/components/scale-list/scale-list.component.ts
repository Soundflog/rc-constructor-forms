import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IInterpretation} from "../../models/IInterpretation";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {InterpretationService} from "../../services/InterpretationService";
import {tuiArrayRemove} from "@taiga-ui/cdk";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";

@Component({
  selector: 'app-scale-list',
  templateUrl: './scale-list.component.html',
  styleUrls: ['./scale-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleListComponent implements OnInit {
  @Input() interpretations: IScaleInterpretationResponse[];

  maxLength = 20;

  scaleFormGroup = this.fb.group({});
  items:IScaleInterpretationResponse[] = [];

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    // this.interpretation$ = this.interpretationService.interpretation$;
    console.log(this.interpretations);
    this.interpretations.forEach((scale, index) => {
      const scaleGroup = this.fb.group({
        id: [scale.id],
        description: [scale.description, Validators.required],
        name: [scale.name, Validators.required],
      });

      this.items.push({
        id: scale.id,
        name: scale.name,
        description: scale.description,
        interpretations: scale.interpretations,
      })
      this.scaleFormGroup.addControl(`${index}`, scaleGroup);
    });
    console.log(this.scaleFormGroup.value);
  }

  shortString(str: string): string {
    if (str.length > this.maxLength) {
      return str.slice(0, this.maxLength) + '...';
    }
    return str;
  }
}
