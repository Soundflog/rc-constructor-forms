import {TuiSizeL, TuiSizeS} from "@taiga-ui/core";

export interface Field {
  type: string;
  label: string;
  size: TuiSizeS | TuiSizeL;
  name: string;
}
