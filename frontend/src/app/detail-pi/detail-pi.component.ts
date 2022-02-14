import { Component, OnInit, Output,Input } from '@angular/core';
import * as L from 'leaflet';
import {
  HttpClient
} from '@angular/common/http';
import {
  PointInteret
} from 'src/app/interfaces/PI';
import {
  PIService
} from 'src/app/services/p-i.service';
import {
  BASE_URL
} from 'src/app/global';
import {
  Categorie
} from 'src/app/interfaces/categorie';
import {
  Age
} from 'src/app/interfaces/age';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-detail-pi',
  templateUrl: './detail-pi.component.html',
  styleUrls: ['./detail-pi.component.css']
})
export class DetailPiComponent implements OnInit {

  @Output() public pi : PointInteret[]= []
  // @Output() public address : string=""
  public pis: PointInteret[] = []
  public categories: Categorie[] = []
  public ages: Age[] = []
  public map: any
  public address : string = ""
  public road : string = ""
  public postCode : number = 0
  public title : string = ""
  public content : string = ""
  public id : number= 0
  public lat : number = 0
  public lng : number = 0


  constructor(
    private http: HttpClient,
    private piService: PIService,
    private router:Router
  ) {
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
    {
     
        id: 0,
        address : ""
        content: ""
        title: ""
        lat: 0
        lng:0
        age:[]
        categorie:[],
        road : "",
        postCode : 0
      
    };
    this.address = state.address
    this.id = state.id
    this.content = state.content
    this.title = state.title
    this.lat = state.lat
    this.lng = state.lng
    this.ages = state.age
    this.categories = state.categorie
    this.road = state.road
    this.postCode = state.postCode
   }

  ngOnInit(): void {
    this.piSelected(this.id)
    console.log(this.pi, 'sur page detail')
    const centre = {
      lat: this.lat,
      lng: this.lng
    };
    // affichage de la map
    this.map = L.map('map').setView(centre, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const marker = L.marker([this.lat, this.lng]).addTo(this.map);
          marker.bindPopup("L'activité se trouve ici").openPopup();
  }

  piSelected(id: number) {
    this.http.get < PointInteret[] > (BASE_URL + `/pi/${id}`, {
        withCredentials: true
      })
      .subscribe((response: PointInteret[]) => {
        this.pi = response
        console.log(this.pi, "response piSelected222222")
        for(let i in this.pi){
          console.log(this.pi[i], "grrrrr");
        } 
        console.log(this.pi[1], "this.pi[1]")
      })
  }
  navigateList(){
    this.router.navigateByUrl("/activity")
  }

}
