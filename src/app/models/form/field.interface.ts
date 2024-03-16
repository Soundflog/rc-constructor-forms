import {IVariant} from "../IVariant";
import {FormControl} from "@angular/forms";

export interface FieldInterface {
  name: string;
  content: string;
  type: FormControl;
  variants: IVariant[];
}
