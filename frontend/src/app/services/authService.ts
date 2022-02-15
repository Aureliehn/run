import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RUN
} from 'src/app/interfaces/PI';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, tap, skip} from 'rxjs/operators';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private etatConnexion : BehaviorSubject< boolean >= new BehaviorSubject< boolean >(false)
  private initialisé : boolean  = false

  constructor(private http: HttpClient) { 
    this.http.get<boolean>(BASE_URL+"/logged_in",{
      withCredentials: true
    }).pipe(
      catchError(_err => of(false))
    ).pipe(
      tap(r => {
        this.etatConnexion.next(r)
        this.initialisé = true
      })
    )
    .subscribe()
  }
 
  public seConnecter(utilisateur: RUN.User): Observable<boolean>{
    return this
      .http
      .post<boolean>(BASE_URL+"/user/login", utilisateur, {
        withCredentials: true
      })
      .pipe(
        tap(r => this.etatConnexion.next(r))
      )
  }

  public estConnecte(): Observable<boolean>{
    if (!this.initialisé)
    {
      console.log("this.initialisé 1", this.initialisé)
      return this.etatConnexion.pipe(skip(1))
    }
    console.log("this.initialisé 2", this.initialisé)
    return this.etatConnexion
    
  }

  public deconnecter(){
    return this.http.post(BASE_URL+"/logout", null,{
      withCredentials: true
    })
    .pipe(
      tap(_=>this.etatConnexion.next(false))
    )
    
  }

  

}


