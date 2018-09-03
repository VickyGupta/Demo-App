import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TokenComponent } from './token/token.component';
import { FormComponent } from './form/form.component';
import { FormDetailComponent } from './form-detail/form-detail.component';

export const ROUTES: Routes = [
    { path: '', component: TokenComponent},
    { path: 'home', component: HomeComponent},
    { path: 'user', component: UserComponent},
    { path: 'form', component: FormComponent},
    { path: 'token', component: TokenComponent},
    { path: 'formDetail/:pId/:fId', component: FormDetailComponent}
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
