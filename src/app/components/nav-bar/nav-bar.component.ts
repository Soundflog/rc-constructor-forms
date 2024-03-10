import { Component } from '@angular/core';
import { tuiIconBell } from '@taiga-ui/icons';
import {provideRouter} from "@angular/router";
import {root} from "postcss";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  username = "USERNAME USERNAME USERNAME"
  tuiIconBell = tuiIconBell
  dropdownlist = [
    'Home',
    'Forms',
    'Scale'
  ]
  logout(){
    console.log("log out")
  }
}
