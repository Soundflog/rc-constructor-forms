import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-nav',
  templateUrl: './dropdown-menu-nav.component.html',
  styleUrls: ['./dropdown-menu-nav.component.less']
})
export class DropdownMenuNavComponent {
  readonly groups = [
    {
      label: 'НАЗВАНИЕ ОРГАНИЗАЦИИ',
      items: [
        {
          label: 'Главная',
          routerLink: '/',
        },
        {
          label: 'Список анкет',
          routerLink: '/forms',
        },
        {
          label: 'Список шкал',
          routerLink: '/scales',
        },
        {
          label: 'Вернуться к пациентам',
          routerLink: '/patients',
        },
      ],
    }
  ];
}
