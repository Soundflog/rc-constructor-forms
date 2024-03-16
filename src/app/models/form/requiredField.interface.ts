import {TuiSizeL, TuiSizeS} from "@taiga-ui/core";
import {FormControl} from "@angular/forms";
import {IVariant} from "../IVariant";

export interface RequiredFieldInterface {
  type: string;
  label: string;
  size: TuiSizeS | TuiSizeL;
  name: string;
}
