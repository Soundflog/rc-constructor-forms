import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTableFormsComponent} from "./pages/home-table-forms/home-table-forms.component";
import {NavigationFullComponent} from "./pages/navigation-full/navigation-full.component";

const routes: Routes = [
  {path: '', component: HomeTableFormsComponent},
  {path: 'exp', component: NavigationFullComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
