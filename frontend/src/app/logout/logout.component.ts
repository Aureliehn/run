import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
//   styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  btnOui() {
    this
    .authService
    .deconnecter()
    .subscribe()
    this.router.navigateByUrl('/auth')
  }
  
  btnNon(){
    this.router.navigateByUrl('/home')
  }

}
