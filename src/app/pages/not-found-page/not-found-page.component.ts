import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {

  constructor(private router:Router) {
  }

  backToHome() {
    this.router.navigate(['/form/list']);
  }
}
