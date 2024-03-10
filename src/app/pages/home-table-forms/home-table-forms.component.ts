import { Component } from '@angular/core';
import {forms} from "../../data/forms";

@Component({
  selector: 'app-home-table-forms',
  templateUrl: './home-table-forms.component.html',
  styleUrls: ['./home-table-forms.component.less']
})
export class HomeTableFormsComponent {
  items = [
    {w: 2, h: 1, content: 'Item 1', status: "Active"},
    {w: 1, h: 1, content: 'Item 2', status: "Active"},
    {w: 1, h: 1, content: 'Item 3', status: "Active"},
    {w: 1, h: 1, content: 'Item 4', status: "Active"},
    {w: 1, h: 1, content: 'Item 5', status: "Active"},
    {w: 1, h: 1, content: 'Item 6', status: "Active"},
    {w: 1, h: 1, content: 'rick', status: "Active"},
    {w: 1, h: 1, content: 'Item 8', status: "Active"},
    {w: 1, h: 1, content: 'Item 9', status: "Active"},
  ];

  order = new Map();

  forms = forms;
}
