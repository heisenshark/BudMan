import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamBuilderComponent } from './components/team-builder/team-builder.component';
import { TeamComponent } from './components/team-builder/team/team.component';
import { BudmanTopbarComponent } from './components/budman-topbar/budman-topbar.component';
import {FormsModule} from "@angular/forms";
import { NavMenuComponent } from './components/budman-topbar/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TeamBuilderComponent,
    TeamComponent,
    BudmanTopbarComponent,
    NavMenuComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
      BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
