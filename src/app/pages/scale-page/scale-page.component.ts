import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {tuiArrayRemove} from "@taiga-ui/cdk";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IInterpretation} from "../../models/IInterpretation";
import {InterpretationService} from "../../services/InterpretationService";
import {Observable} from "rxjs";
import {IScaleInterpretationResponse} from "../../models/ScaleInterpretationResponse";

@Component({
  selector: 'app-scale-page',
  templateUrl: './scale-page.component.html',
  styleUrls: ['./scale-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalePageComponent implements OnInit{

  search :string;
  control = new FormControl();

  interpretations$: Observable<IScaleInterpretationResponse[]>;
  constructor(private interpretationService: InterpretationService) {}
  ngOnInit() {
    this.interpretations$ = this.interpretationService.getAllInterpretations();
  }
}
