import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./dashboard/home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./guard/auth-guard.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { DemoViewComponent } from "./dashboard2/demo-view/demo-view.component";
import { DemoViewOneComponent } from "./dashboard2/demo-view/demo-view-one/demo-view-one.component";
import { DemoViewTwoComponent } from "./dashboard2/demo-view/demo-view-two/demo-view-two.component";
import { LookupComponent } from "./dashboard/lookup/lookup.component";
import { AssetsclassificationComponent } from './dashboard/assetdeclaration/assetsclassification/assetsclassification.component';
import { AssetstypeComponent } from './dashboard/assetdeclaration/assetstype/assetstype.component';
import { FinancialtaxyearComponent } from './dashboard/assetdeclaration/financialtaxyear/financialtaxyear.component';
import { IncomeheadtypeComponent } from './dashboard/assetdeclaration/incomeheadtype/incomeheadtype.component';
import { TaxpayerComponent } from './dashboard/taxpayer/taxpayer.component';
import { TaxpayerassetsComponent } from './dashboard/taxpayer/taxpayerassets/taxpayerassets.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { AssetsdocumentComponent } from './dashboard/assetsdocument/assetsdocument.component';
import { TaxpayerincomeComponent } from './dashboard/taxpayer/taxpayerincome/taxpayerincome.component';
import { TaxpayerviewComponent } from './dashboard/taxpayer/taxpayerview/taxpayerview.component';
import { TaxcalculationComponent } from './dashboard/taxcalculation/taxcalculation.component';
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '404', component: NotFoundComponent },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'lookup', component: LookupComponent },
           {path:'assetsclassification', component:AssetsclassificationComponent},
           {path:'assetstypes', component:AssetstypeComponent},
           {path:'financialtaxyear', component:FinancialtaxyearComponent},
           {path:'incomeheadtype', component:IncomeheadtypeComponent},
           {path:'taxpayment', component:PaymentComponent},
           {path:'assetsdocument', component:AssetsdocumentComponent},
           {path:'taxpayer', component:TaxpayerComponent},
           {path:'taxpayerassets', component:TaxpayerassetsComponent},
           {path:'taxpayerincome', component:TaxpayerincomeComponent},
           {path:'taxcalculation', component:TaxcalculationComponent},
            { path: '**', component: NotFoundComponent }
        ], canActivate: [AuthGuardService]
    },
    {
        path: 'view', component: Dashboard2Component,
        children: [
            { path: '', component: NotFoundComponent },
            {
                path: 'demo/:id', component: DemoViewComponent,
                children: [
                    { path: '', component: DemoViewOneComponent },
                    { path: 'DemoviewOne', component: DemoViewOneComponent },
                    { path: 'DemoviewTwo', component: DemoViewTwoComponent },
                    { path: '**', component: NotFoundComponent },
                ], canActivate: [AuthGuardService],
            },
            {
                path: 'taxpayer/:id', component: TaxpayerviewComponent,
                children: [
                    { path: '', component: DemoViewOneComponent },
                    { path: 'taxpayerassets', component: TaxpayerassetsComponent },
                    { path: 'taxpayerincome', component: TaxpayerincomeComponent },
                    { path: '**', component: NotFoundComponent },
                ], canActivate: [AuthGuardService],
            },
            { path: '**', component: NotFoundComponent },
        ], canActivate: [AuthGuardService]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
