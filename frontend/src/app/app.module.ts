import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { FooterComponent } from './utils/footer/footer.component';
import { FormComponent } from './path/form/form.component';
import { ListComponent } from './path/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { DetailPiComponent } from './detail-pi/detail-pi.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LogoutComponent } from './logout/logout.component';
import { FormPicComponent } from './pic/form-pic/form-pic.component';
import { ListPicComponent } from './pic/list-pic/list-pic.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FormComponent,
    ListComponent,
    HomeComponent,
    ActivityListComponent,
    DetailPiComponent,
    AuthComponent,
    RegistrationComponent,
    LogoutComponent,
    FormPicComponent,
    ListPicComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
