import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiSvgModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiSvgDefsHostModule,
  TuiDropdownModule,
  TuiTextfieldControllerModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLabelModule,
  TuiPrimitiveTextfieldModule,
  TuiWrapperModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TuiAppearanceModule, TuiAvatarModule, TuiBadgeNotificationModule, TuiButtonGroupModule,
  TuiCardModule, TuiFadeModule, TuiHeaderModule,
  TuiIconModule, TuiIconsModule,
  TuiNavigationModule, TuiSurfaceModule, TuiTitleModule
} from '@taiga-ui/experimental'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeTableFormsComponent } from './pages/home-table-forms/home-table-forms.component';
import {
    TuiAccordionModule,
    TuiArrowModule,
    TuiBadgedContentModule,
    TuiBadgeModule, TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule, TuiElasticContainerModule,
    TuiFilterByInputPipeModule, TuiInputCountModule,
    TuiInputModule, TuiInputNumberModule,
    TuiIslandModule, TuiLineClampModule,
    TuiMarkerIconModule, TuiRadioBlockModule, TuiRadioModule, TuiSelectModule,
    TuiStringifyContentPipeModule,
    TuiTabsModule,
    TuiTextareaModule,
    TuiTilesModule, TuiToggleModule
} from "@taiga-ui/kit";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {TuiAppBarModule} from "@taiga-ui/addon-mobile";
import { HttpClientModule } from '@angular/common/http'
import {TuiDocNavigationModule} from "@taiga-ui/addon-doc";
import {TuiLetModule, TuiRepeatTimesModule, TuiValueChangesModule} from "@taiga-ui/cdk";
import { FormsHomeComponent } from './components/forms-home/forms-home.component';
import { DropdownMenuNavComponent } from './components/dropdown-menu-nav/dropdown-menu-nav.component';
import { NewFormPageComponent } from './pages/main-form-constructor/new-form-page/new-form-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ScaleListPageComponent } from './pages/scale-list-page/scale-list-page.component';
import { ScalePageComponent } from './pages/scale-page/scale-page.component';
import {FilterPipe} from "./components/forms-home/pipe/FilterPipe.component";
import {InterFilterPipe} from "./components/scale-list/pipe/FilterPipe";
import { ScaleListComponent } from './components/scale-list/scale-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ScaleConstructorPageComponent } from './pages/scale-constructor-page/scale-constructor-page.component';
import { ScaleConstructorComponent } from './components/scale-constructor/scale-constructor.component';
import {httpInterceptorProviders} from "./services/auth-interceptor";
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {TuiBlockStatusModule} from "@taiga-ui/layout";
import { MainFormConstructorComponent } from './pages/main-form-constructor/main-form-constructor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeTableFormsComponent,
    NavBarComponent,
    FormsHomeComponent,
    DropdownMenuNavComponent,
    NewFormPageComponent,
    AuthPageComponent,
    HomePageComponent,
    ScaleListPageComponent,
    ScalePageComponent,
    FilterPipe,
    InterFilterPipe,
    ScaleListComponent,
    LoadingComponent,
    ScaleConstructorPageComponent,
    ScaleConstructorComponent,
    NotFoundPageComponent,
    MainFormConstructorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TuiHintModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTilesModule,
    TuiSvgModule,
    TuiAppBarModule,
    TuiButtonModule,
    TuiBadgeModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiAvatarModule,
    TuiExpandModule,
    TuiTabsModule,
    TuiDocNavigationModule,
    TuiMarkerIconModule,
    TuiSvgDefsHostModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiDropdownModule,
    TuiTextfieldControllerModule,
    TuiAppearanceModule,
    TuiIconsModule,
    TuiNavigationModule,
    TuiIconModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiHeaderModule,
    TuiTitleModule,
    TuiFadeModule,
    TuiRepeatTimesModule,
    TuiBadgeNotificationModule,
    TuiAvatarModule,
    TuiButtonGroupModule,
    TuiIslandModule,
    TuiArrowModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiGroupModule,
    TuiAccordionModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiStringifyContentPipeModule,
    TuiFilterByInputPipeModule,
    TuiRadioBlockModule,
    TuiElasticContainerModule,
    TuiSelectModule,
    TuiInputCountModule,
    TuiLabelModule,
    TuiToggleModule,
    TuiRadioModule,
    TuiCheckboxModule,
    TuiButtonModule,
    TuiInputNumberModule,
    TuiLineClampModule,
    TuiValueChangesModule,
    TuiLetModule,
    TuiBlockStatusModule,
    TuiPrimitiveTextfieldModule,
    TuiWrapperModule
  ],
  providers: [httpInterceptorProviders,
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
