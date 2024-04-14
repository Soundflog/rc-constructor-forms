import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IInterpretation} from "../../models/IInterpretation";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {InterpretationService} from "../../services/InterpretationService";
import {tuiArrayRemove} from "@taiga-ui/cdk";

@Component({
  selector: 'app-scale-list',
  templateUrl: './scale-list.component.html',
  styleUrls: ['./scale-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleListComponent implements OnInit {
  @Input() interpretations: IInterpretation[];

  maxLength = 20;

  scaleFormGroup = this.fb.group({});
  items = [
    {
      expanded: false,
      id: 0,
      name: 'Test 1',
      description: 'Test description 1',
      scale: {
        id: 0,
        name: 'Test scale 1',
        description: 'Test scale description 1',
      }
    },
  ];

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    // this.interpretation$ = this.interpretationService.interpretation$;
    console.log(this.interpretations);
    this.interpretations.forEach((scale, index) => {
      const scaleGroup = this.fb.group({
        id: [scale.id],
        description: [scale.description, Validators.required],
        minValue: [scale.minValue, Validators.required],
        maxValue: [scale.maxValue, Validators.required],
        scale: this.fb.group({
          id: [scale.scale.id],
          name: [scale.scale.name, Validators.required],
          description: [scale.scale.description],
        })
      });

      this.items.push({
        expanded: false,
        id: scale.id,
        name: `${index}`,
        description: scale.description,
        scale: scale.scale
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

  add(): void {
    this.items = this.items.concat(
      {
        expanded: false,
        id: 0,
        name: 'Test',
        description: 'New value',
        scale: {
          id: 0,
          name: 'Test scale',
          description: 'Test scale description',
        }
      }
    );
  }

  remove(index: number): void {
    this.items = tuiArrayRemove(this.items, index);
  }
}
