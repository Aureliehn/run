import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { AuthComponent } from './auth/auth.component';
import { DetailPiComponent } from './detail-pi/detail-pi.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { FormComponent } from './path/form/form.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './services/authGuardService';


const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component: HomeComponent},
  { path: 'create', component: FormComponent},
  { path: 'activity', component: ActivityListComponent},
  { path: 'detail', component: DetailPiComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
