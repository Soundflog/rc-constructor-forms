import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, NgControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TuiAlertService, TuiPrimitiveTextfieldComponent} from "@taiga-ui/core";
import {AbstractTuiControl, TuiNativeFocusableElement} from "@taiga-ui/cdk";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent extends AbstractTuiControl<string> {

  logo_im = 'https://angular.io/assets/images/logos/angular/angular.png'
  authForm: FormGroup;

  // password
  @ViewChild(TuiPrimitiveTextfieldComponent)
  private readonly textfield?: TuiPrimitiveTextfieldComponent;
  private isPasswordHidden = true;

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
      control: NgControl | null,
    @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private router: Router
  ) {
    super(control, cdr);
    this.authForm = fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      // this.authService.login(this.authForm.value).subscribe(
      //   () => {
      //     this.router.navigate(['/form/list']).then(() => {
      //     })
      //     this.alerts.open('Вы успешно вошли в систему', {status: 'success'}).subscribe()
      //   });
      this.router.navigate(['/form/list']).then(() => {
      })
    } else {
      this.alerts.open('Заполните все поля', {status: 'warning'}).subscribe()
    }
  }

  get nativeFocusableElement(): TuiNativeFocusableElement | null {
    return this.computedDisabled || !this.textfield
      ? null
      : this.textfield.nativeFocusableElement;
  }

  get focused(): boolean {
    return !!this.textfield?.focused;
  }

  get icon(): string {
    return this.isPasswordHidden ? 'tuiIconEyeLarge' : 'tuiIconEyeOffLarge';
  }

  get hint(): string {
    return this.isPasswordHidden ? 'Show password' : 'Hide password';
  }

  get inputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  onFocused(focused: boolean): void {
    this.updateFocused(focused);
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  protected getFallbackValue(): string {
    return '';
  }
}
