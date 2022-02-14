import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import { BASE_URL } from '../global';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public email: string=""
  public password: string=""
  public formRegister: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { 
    this.formRegister = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  submit(): void{
    console.log('hello')
    if (this.formRegister.valid){
      this.registration()
    }
    else{
      console.log("erreur")
    }
  }

  public registration() {
    console.log(this.email, this.password)
    this.http.post(BASE_URL + '/inscription', {
        email: this.email,
        password: this.password,
      })
      
      .subscribe({
        next: () => this.router.navigateByUrl("/home"),
        error: (e) => console.log(e),
        
      })
  }

}
