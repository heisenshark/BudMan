import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { TeamBuilderComponent } from './components/team-builder/team-builder.component'
import { TeamComponent } from './components/team-builder/team/team.component'
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
import { TictactoeComponent } from './components/tictactoe/tictactoe.component'
import { SquareComponent } from './components/tictactoe/square/square.component'
import { BoardComponent } from './components/tictactoe/board/board.component'
import { TasksManagerComponent } from './components/tasks-manager/tasks-manager.component'
import { HeaderComponent } from './components/tasks-manager/header/header.component'
import { FooterComponent } from './components/tasks-manager/footer/footer.component'
import { ButtonComponent } from './components/tasks-manager/button/button.component'
import { TasksComponent } from './components/tasks-manager/tasks/tasks.component'
import { TasksItemComponent } from './components/tasks-manager/tasks-item/tasks-item.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatPaginatorModule } from '@angular/material/paginator'
import { HttpClientModule } from '@angular/common/http'
import { AddTaskComponent } from './components/tasks-manager/add-task/add-task.component'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './components/tasks-manager/about/about.component'
import { TransactionButtonComponent } from './components/budman-transactions-page/transaction-button/transaction-button.component'
import { TransactionAddComponent } from './components/budman-transactions-page/transaction-add/transaction-add.component'
import { NumbersOnlyDirective } from './directives/numbers-only.directive'
import { VignetteComponent } from './components/vignette/vignette.component'
import { DatePipe } from '@angular/common';
import { BudmanCategoryPageComponent } from './components/budman-category-page/budman-category-page.component';
import { BudmanAccountPageComponent } from './components/budman-account-page/budman-account-page.component'


const appRoutes: Routes = [
  { path: 'transactions', component: BudmanTransactionsPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'categories', component: BudmanCategoryPageComponent },
  { path: 'accounts', component: BudmanAccountPageComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    TeamBuilderComponent,
    TeamComponent,
    BudmanTopbarComponent,
    NavMenuComponent,
    BudmanTransactionsPageComponent,
    TransactionComponent,
    CategoryPickerComponent,
    TictactoeComponent,
    SquareComponent,
    BoardComponent,
    TasksManagerComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    TasksComponent,
    TasksItemComponent,
    AddTaskComponent,
    AboutComponent,
    TransactionButtonComponent,
    TransactionAddComponent,
    NumbersOnlyDirective,
    VignetteComponent,
    BudmanCategoryPageComponent,
    BudmanAccountPageComponent,
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
  ],
  providers: [MatDatepickerModule,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
