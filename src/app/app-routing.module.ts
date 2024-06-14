import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTableFormsComponent} from "./pages/home-table-forms/home-table-forms.component";
import {NewFormPageComponent} from "./pages/main-form-constructor/new-form-page/new-form-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {authGuard} from "./services/auth.guard";
import {ScaleListPageComponent} from "./pages/scale-list-page/scale-list-page.component";
import {ScalePageComponent} from "./pages/scale-page/scale-page.component";
import {ScaleConstructorPageComponent} from "./pages/scale-constructor-page/scale-constructor-page.component";
import {MainFormConstructorComponent} from "./pages/main-form-constructor/main-form-constructor.component";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'form', component: HomePageComponent,
    canActivate: [authGuard()],
    children: [
      {path: 'list', component: HomeTableFormsComponent},
      {path: 'new', component: MainFormConstructorComponent},
      {path: ':form_id', component: MainFormConstructorComponent}
    ]},
  {path: 'scale', component: ScaleListPageComponent,
    canActivate: [authGuard()],
    children: [
      {path: 'list', component: ScalePageComponent},
      {path: 'new', component: ScaleConstructorPageComponent},
      {path: ':scale_id', component: ScaleConstructorPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
