import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';

import { IconPickerModule } from "ngx-icon-picker";
import { DatePipe } from "@angular/common";
import { SafePipe} from "./pipe/safe.pipe";
import { FilterPipe } from "./pipe/filter.pipe";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
// Toastr message Notification
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Http import LoadingBarHttpModule:
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
// for Router import LoadingBarRouterModule:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgSelectModule } from "@ng-select/ng-select";
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppRoutingModule } from "./app-routing.module";
import { AssetsclassificationComponent } from './dashboard/assetdeclaration/assetsclassification/assetsclassification.component';
import { AssetstypeComponent } from './dashboard/assetdeclaration/assetstype/assetstype.component';
import { FinancialtaxyearComponent } from './dashboard/assetdeclaration/financialtaxyear/financialtaxyear.component';
import { IncomeheadtypeComponent } from './dashboard/assetdeclaration/incomeheadtype/incomeheadtype.component';
import { TaxpayerassetsComponent } from './dashboard/taxpayer/taxpayerassets/taxpayerassets.component';

import{
  DxMenuModule,
  DxRangeSelectorModule,
  DxPopupModule,
  DxChartModule,
  DxPieChartModule,
  DxVectorMapModule,
  DxDataGridModule,
  DxBulletModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

// cookies usage
import { CookieService } from 'ngx-cookie-service';
// alerts sweet
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AgGridModule } from "ag-grid-angular";

import { HttpErrorInterceptor } from "./services/http-error.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OnFailService } from "./services/on-fail.service";
// All components that are new created will b refer there for link to the project
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./dashboard/header/header.component";
import { HomeComponent } from "./dashboard/home/home.component";
import { LoginComponent } from "./login/login.component";

import { AuthGuardService } from "./guard/auth-guard.service";
import { FooterComponent } from './dashboard/footer/footer.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { DemoViewComponent  } from "./dashboard2/demo-view/demo-view.component";
import { DemoViewOneComponent } from './dashboard2/demo-view/demo-view-one/demo-view-one.component';
import { DemoViewTwoComponent } from './dashboard2/demo-view/demo-view-two/demo-view-two.component';
import { LookupComponent } from './dashboard/lookup/lookup.component';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { ViewRendererComponent } from './renderer/View-renderer.component';
import { RequestOptionsService } from './services/setting.headers';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { TaxcalculationComponent } from './dashboard/taxcalculation/taxcalculation.component';
import { AssetsdocumentComponent } from './dashboard/assetsdocument/assetsdocument.component';
import { TaxpayerincomeComponent } from './dashboard/taxpayer/taxpayerincome/taxpayerincome.component';
import { TaxpayerviewComponent } from './dashboard/taxpayer/taxpayerview/taxpayerview.component';
import { TaxpayerComponent } from './dashboard/taxpayer/taxpayer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    FilterPipe,
    SafePipe,
    Dashboard2Component,
    DemoViewOneComponent,
    DemoViewComponent,
    DemoViewTwoComponent,
    LookupComponent,
    ButtonRendererComponent,
    ViewRendererComponent,
    AssetsclassificationComponent,
    AssetstypeComponent,
    FinancialtaxyearComponent,
    IncomeheadtypeComponent,
    TaxpayerComponent,
    TaxpayerassetsComponent,
    PaymentComponent,
    TaxcalculationComponent,
    AssetsdocumentComponent,
    TaxpayerincomeComponent,
    TaxpayerviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    LoadingBarHttpModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    LoadingBarModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AgGridModule.withComponents([ButtonRendererComponent, ViewRendererComponent]),
    NgSelectModule,
    IconPickerModule,
    NgxSpinnerModule,
    DxMenuModule,
    DxRangeSelectorModule,
    DxPopupModule,
    DxChartModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxDataGridModule,
    DxBulletModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: RequestOptions,
      useClass: RequestOptionsService
    },
    AuthGuardService,
    DatePipe,
    OnFailService,
    CookieService,
    SafePipe,
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
