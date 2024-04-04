import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TUI_ARROW} from '@taiga-ui/kit'

@Component({
  selector: 'app-dropdown-menu-nav',
  templateUrl: './dropdown-menu-nav.component.html',
  styleUrls: ['./dropdown-menu-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuNavComponent {
  readonly arrow = TUI_ARROW;

  readonly groups = [
    {
      label: 'НАЗВАНИЕ ОРГАНИЗАЦИИ',
      items: [
        {
          label: 'Новая анкета',
          routerLink: '/form/new',
        },
        {
          label: 'Список анкет',
          routerLink: '/form/list',
        },
        {
          label: 'Список шкал',
          routerLink: '/scale/list',
        },
        {
          label: 'Вернуться к пациентам',
          routerLink: '/patients',
        },
      ],
    }
  ];
}
