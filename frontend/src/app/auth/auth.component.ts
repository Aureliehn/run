import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public email: string=""
  public password: string=""
  public formAuth: FormGroup;
  isSubmitted = false
  failed= false;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService : AuthService
    ) { 
    this.formAuth = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
 
  submit(): void{
    console.log('hello')
    if (this.formAuth.valid){
      this.auth()
    }
    else{
      console.log("erreur")
    }
  }

  get formControls(){return this.formAuth.controls;}
  auth(){
    console.log("2")
    this.isSubmitted = true;
    if(this.formAuth.invalid){
      return console.log("erreur dans fction auth");
    }
    this
      .authService
      .seConnecter(this.formAuth.value)
      .subscribe({
        next: () => this.router.navigateByUrl("/home"),
        error: (e) => console.log(e),
        
      })
    }

}
