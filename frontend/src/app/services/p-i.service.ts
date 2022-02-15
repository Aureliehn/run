import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUN } from '../interfaces/PI';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PIService {

  constructor(private http: HttpClient) { }

  public printListPi() {
    return this.http.get < RUN.PointInteret[] > (BASE_URL + '/pis/', {
      withCredentials: true
    })
  }

  public recuperationPointInteret(filtre: string) {
    this.http.get < RUN.PointInteret[] > (BASE_URL + `/pis/${filtre}`, {
        withCredentials: true,
      })
    }

  
}
