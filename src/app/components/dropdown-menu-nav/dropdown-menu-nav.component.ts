import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TUI_ARROW} from '@taiga-ui/kit'

@Component({
  selector: 'app-dropdown-menu-nav',
  templateUrl: './dropdown-menu-nav.component.html',
  styleUrls: ['./dropdown-menu-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuNavComponent {
  arrow = TUI_ARROW;

  readonly groups = [
    {
      label: 'RehabSurvey',
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
          label: 'Создать шкалу',
          routerLink: '/scale/new',
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
