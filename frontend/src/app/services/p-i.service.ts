import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PointInteret } from '../interfaces/PI';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PIService {

  constructor(private http: HttpClient) { }

  public printListPi() {
    return this.http.get < PointInteret[] > (BASE_URL + '/pis/', {
      withCredentials: true
    })
  }

  public recuperationPointInteret(filtre: string) {
    this.http.get < PointInteret[] > (BASE_URL + `/pis/${filtre}`, {
        withCredentials: true,
      })
    }

  
}
