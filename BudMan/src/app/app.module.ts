import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamBuilderComponent } from './components/team-builder/team-builder.component';
import { TeamComponent } from './components/team-builder/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamBuilderComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
