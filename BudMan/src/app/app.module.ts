import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { BudmanTopbarComponent } from './components/budman-topbar/budman-topbar.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { NavMenuComponent } from './components/nav-menu/nav-menu.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BudmanTransactionsPageComponent } from './components/budman-transactions-page/budman-transactions-page.component'
import { TransactionComponent } from './components/budman-transactions-page/transaction/transaction.component'
import { MatIconModule } from "@angular/material/icon"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { CategoryPickerComponent } from './components/budman-transactions-page/category-picker/category-picker.component'
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatInputModule } from "@angular/material/input"
import { MatSliderModule } from "@angular/material/slider"
import { MatBadgeModule } from "@angular/material/badge"
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatCheckboxModule } from "@angular/material/checkbox"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatPaginatorModule } from '@angular/material/paginator'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { TransactionButtonComponent } from './components/budman-transactions-page/transaction-button/transaction-button.component'
import { NumbersOnlyDirective } from './directives/numbers-only.directive'
import { DatePipe } from '@angular/common';
import { BudmanCategoryPageComponent } from './components/budman-category-page/budman-category-page.component';
import { BudmanAccountPageComponent } from './components/budman-account-page/budman-account-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component'
import { httpInterceptorProviders } from './_helpers/http.intreceptor';
import { TransactionAddDialogComponent } from './components/budman-transactions-page/transaction-add-dialog/transaction-add-dialog.component'
import {MatDialogModule} from '@angular/material/dialog';
import { LoginActivate } from './_helpers/LoginActivate'
import { CookieService } from './services/cookie-service.service';
import { TransactionActivate } from './_helpers/TransacionActivate'

const appRoutes: Routes = [
  { path: 'transactions', component: BudmanTransactionsPageComponent ,canActivate:[LoginActivate]},
  { path: 'categories', component: BudmanCategoryPageComponent ,canActivate:[LoginActivate]},
  { path: 'accounts', component: BudmanAccountPageComponent ,canActivate:[LoginActivate]},
  { path: 'login', component: LoginPageComponent,canActivate:[TransactionActivate] },
  { path: 'register', component: LoginPageComponent,canActivate:[TransactionActivate]},
  { path: 'forgot', component: LoginPageComponent,canActivate:[TransactionActivate]},
  { path: '**', redirectTo:'transactions' },
]
@NgModule({
  declarations: [
    AppComponent,
    BudmanTopbarComponent,
    NavMenuComponent,
    BudmanTransactionsPageComponent,
    TransactionComponent,
    CategoryPickerComponent,
    TransactionButtonComponent,
    NumbersOnlyDirective,
    BudmanCategoryPageComponent,
    BudmanAccountPageComponent,
    LoginPageComponent,
    TransactionAddDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatSliderModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FontAwesomeModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [MatDatepickerModule,
    DatePipe,
    httpInterceptorProviders,
    LoginActivate,
    TransactionActivate,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
