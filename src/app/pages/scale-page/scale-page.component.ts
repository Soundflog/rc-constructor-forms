import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {tuiArrayRemove} from "@taiga-ui/cdk";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ScaleService} from "../../services/ScaleService";
import {Observable, tap} from "rxjs";
import {IScale} from "../../models/IScale";
import {IForm} from "../../models/IForm";

@Component({
  selector: 'app-scale-page',
  templateUrl: './scale-page.component.html',
  styleUrls: ['./scale-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalePageComponent implements OnInit{
  scaleFormGroup = this.fb.group({});
  scales: IScale[] = [];
  scales$ : Observable<IScale[]>;
  items = [
    {
      expanded: false,
      id: 0,
      name: 'Test 1',
      description: 'Test description 1'
    },
  ];

  constructor(private fb: FormBuilder,
              private scaleService: ScaleService) {

  }
  ngOnInit(): void {
    this.scales$ = this.scaleService.scales$;
    this.scales.forEach((scale, index) => {
      const scaleGroup = this.fb.group({
        id: [scale.id],
        name: [scale.name, Validators.required],
        description: [scale.description, Validators.required]
      });

      this.items.push({
        expanded: false,
        id: scale.id,
        name: `${index}`,
        description: scale.description,
      })
      this.scaleFormGroup.addControl(`${index}`, scaleGroup);
    });
    console.log(this.scaleFormGroup.value);
  }

  add(): void {
    this.items = this.items.concat(
      {
        expanded: false,
        id: 0,
        name: 'Test',
        description: 'New value'
      }
    );
  }

  remove(index: number): void {
    this.items = tuiArrayRemove(this.items, index);
  }
}
