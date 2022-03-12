import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private oauthService: OAuthService
  ) { 

    // this.configureSingleSinOn()
  }

  ngOnInit(): void {
  }
  // configureSingleSinOn(){
  //   this.oauthService.configure(authCodeFlowConfig)
  //   this.oauthService.tokenValidationHandler = new JwksValidationHandler()
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin()
  // }


  // get token(){
  //   let claims: any = this.oauthService.getIdentityClaims();
  //   return claims ? claims: null
  // }
  // public login(){
  //   console.log("login")
  //   this.oauthService.initImplicitFlow()
  // }
  // public logout(){
  //   console.log("logout")
  //   this.oauthService.logOut()
  // }
}
