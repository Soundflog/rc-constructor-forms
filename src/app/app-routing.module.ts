import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTableFormsComponent} from "./pages/home-table-forms/home-table-forms.component";
// import {NavigationFullComponent} from "./pages/navigation-full/navigation-full.component";
import {NewFormPageComponent} from "./pages/new-form-page/new-form-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'form', component: HomePageComponent,
    canActivate: [authGuard()],
    children: [
      {path: '', component: HomeTableFormsComponent},
      {path: 'new', component: NewFormPageComponent},
      {path: ':form_id', component: NewFormPageComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
