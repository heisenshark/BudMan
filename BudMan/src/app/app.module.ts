import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamBuilderComponent } from './components/team-builder/team-builder.component';
import { TeamComponent } from './components/team-builder/team/team.component';
import { BudmanTopbarComponent } from './components/budman-topbar/budman-topbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavMenuComponent } from './components/budman-topbar/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudmanTransactionsPageComponent } from './components/budman-transactions-page/budman-transactions-page.component';
import { TransactionComponent } from './components/budman-transactions-page/transaction/transaction.component';
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CategoryPickerComponent } from './components/budman-transactions-page/category-picker/category-picker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatBadgeModule} from "@angular/material/badge";
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TictactoeComponent } from './components/tictactoe/tictactoe.component';
import { SquareComponent } from './components/tictactoe/square/square.component';
import { BoardComponent } from './components/tictactoe/board/board.component';
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
    BoardComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
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
        MatCheckboxModule
    ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
