import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTableFormsComponent} from "./pages/home-table-forms/home-table-forms.component";
// import {NavigationFullComponent} from "./pages/navigation-full/navigation-full.component";
import {NewFormPageComponent} from "./pages/new-form-page/new-form-page.component";

const routes: Routes = [
  {path: '', component: HomeTableFormsComponent},
  { path: 'new', component: NewFormPageComponent},
  // {path: 'exp', component: NavigationFullComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
