import { Component } from '@angular/core';
import { tuiIconBell } from '@taiga-ui/icons';
import {provideRouter, Router} from "@angular/router";
import {root} from "postcss";
import {AuthService} from "../../services/auth.service";

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

  constructor(private router: Router, private authService: AuthService) {
  }
  logout(){
    this.authService.logout();
  }
}
