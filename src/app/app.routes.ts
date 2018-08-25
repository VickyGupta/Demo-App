import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add your component here
import { UserComponent } from './home/user/user.component';  // Add your component here
import { TokenComponent } from './home/token/token.component';  // Add your component here
import { FormComponent } from './home/form/form.component';  // Add your component here
import { FormDetailComponent } from './home/form-detail/form-detail.component';  // Add your component here


// This is my case
const routes: Routes = [
    {
        path: '',
        component: TokenComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'form',
        component: FormComponent
    },
    {
        path: 'token',
        component: TokenComponent
    },
    {
        path: 'formDetail/:pId/:fId',
        component: FormDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
