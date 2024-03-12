import {TuiSizeL, TuiSizeS} from "@taiga-ui/core";
import {FormControl} from "@angular/forms";

export interface Field {
  type: string;
  label: string;
  size: TuiSizeS | TuiSizeL;
  name: string;
  relationBox: FormControl
}

export interface ComboField {
  type: string;
  value: string;
}
