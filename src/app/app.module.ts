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
  TuiTextfieldControllerModule, TuiGroupModule, TuiHintModule, TuiLabelModule
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
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule, TuiRadioBlockModule, TuiRadioModule, TuiSelectModule,
  TuiStringifyContentPipeModule,
  TuiTabsModule,
  TuiTextareaModule,
  TuiTilesModule, TuiToggleModule
} from "@taiga-ui/kit";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {TuiAppBarModule} from "@taiga-ui/addon-mobile";
import { HttpClientModule } from '@angular/common/http'
// import { NavigationFullComponent } from './pages/navigation-full/navigation-full.component';
import {TuiDocNavigationModule} from "@taiga-ui/addon-doc";
import {TuiRepeatTimesModule} from "@taiga-ui/cdk";
import { FormsHomeComponent } from './components/forms-home/forms-home.component';
import { DropdownMenuNavComponent } from './components/dropdown-menu-nav/dropdown-menu-nav.component';
import { NewFormPageComponent } from './pages/new-form-page/new-form-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QuestionConstructorComponent } from './components/question-constructor/question-constructor.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ScaleListPageComponent } from './pages/scale-list-page/scale-list-page.component';
import { ScalePageComponent } from './pages/scale-page/scale-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeTableFormsComponent,
    NavBarComponent,
    FormsHomeComponent,
    DropdownMenuNavComponent,
    NewFormPageComponent,
    QuestionConstructorComponent,
    AuthPageComponent,
    HomePageComponent,
    ScaleListPageComponent,
    ScalePageComponent
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
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
