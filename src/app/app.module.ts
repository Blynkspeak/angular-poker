import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokerRegexDirective } from './poker-regex.directive';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PokerRegexDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
