import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
         MatChipsModule,
         MatDialogModule,
         MatExpansionModule,
         MatMenuModule
      } from '@angular/material';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeDirective } from './home/home.directive';
import { HomeService } from './home/home.service';
import { TokenComponent } from './token/token.component';
import { UserComponent } from './user/user.component';
import { FormComponent } from './form/form.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeDirective,
    TokenComponent,
    UserComponent,
    FormComponent,
    FormDetailComponent,
    FormModalComponent
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
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  entryComponents: [FormModalComponent],
  providers: [HomeDirective, HomeService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
