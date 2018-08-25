import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MatButtonModule,
         MatCheckboxModule,
         MatIconModule,
         MatAutocompleteModule,
         MatToolbarModule,
         MatFormFieldModule,
         MatInputModule,
         MatSlideToggleModule,
         MatSidenavModule,
         MatTableModule,
         MatCardModule,
         MatChipsModule
      } from '@angular/material';


import { AppRoutingModule } from './app.routes'; // Added here
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeDirective } from './home/home.directive';
import { HomeService } from './home/home.service';
import { TokenComponent } from './home/token/token.component';
import { UserComponent } from './home/user/user.component';
import { FormComponent } from './home/form/form.component';
import { FormDetailComponent } from './home/form-detail/form-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeDirective,
    TokenComponent,
    UserComponent,
    FormComponent,
    FormDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    AppRoutingModule
  ],
  providers: [HomeDirective, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
