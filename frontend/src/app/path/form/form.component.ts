import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as L from 'leaflet';
import {
  BASE_URL
} from '../../global';
import {
  PointInteret
} from 'src/app/interfaces/PI';
import {
  PIService
} from 'src/app/services/p-i.service';
import "rxjs/add/operator/map";
import {
  Location
} from './location';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Age } from 'src/app/interfaces/age';
import { Categorie } from 'src/app/interfaces/categorie';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public formAddPI: FormGroup;
  public pointInteret: PointInteret[] = []
  public title: string = ""
  public age_id: number = 0
  public categorie_id: number = 0
  public lat: number = 0
  public lng: number = 0
  public latitude: number = 0
  public content: string = ""
  public mapLocalisation: boolean = false
  public localisationIsVisible: boolean = true
  public address: string = ""
  public icoNew = L.icon({
    iconUrl: 'assets/images/pin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]

  });
  public map: any
  public ages: Age[] = []
  public categories: Categorie[] = []

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private piService: PIService
  ) {
    this.formAddPI = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      age_id: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      categorie_id: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.showAge()
    this.showCategorie()

    const centre = {
      lat: 46.77668,
      lng: 3.07722
    };

    // affichage de la map
    this.map = L.map('map').setView(centre, 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on('click', (e: L.LeafletMouseEvent) => {this.setLatLng(e.latlng.lat, e.latlng.lng)})
    this.map.on('locationfound', (e: L.LocationEvent) => {this.setLatLng(e.latlng.lat, e.latlng.lng)})
    this.printListPiService(this.map)
  }
  private setLatLng(lat: number, lng: number) {
    this.lat =lat;
    this.lng = lng;
  }

  // Affichage de tous les PI
  public printListPiService(map: any) {
    this.piService.printListPi()
      .subscribe((response: PointInteret[]) => {
        this.pointInteret = response
        for (const d of response) {
          const marker = L.marker([d.lat, d.lng], {
            icon: this.icoNew
          }).addTo(map);
        }
      })
  }

  // récupérer les emplacements

  //  Géolocalisation ANCHOR
  clickLocalisation() {
    this.mapLocalisation = true
    this.map.locate()
  }
  handleLocation(position: any) {
    function onLocationError(e: any) {
      // this.localisationIsVisible = true
      alert(e.message);
    }
  }

  public testlng(e: any) {
    console.log(this.lng)
  }

  // RECHERCHE EN TAPANT L'ADRESSE
  public async geocode(adresse: any, map: any) {
    this.address = adresse
    let url = `https://nominatim.openstreetmap.org/search/?format=json&addressdetails=1&q=${adresse}`;
    let resp = await fetch(url);
    let datas = await resp.json();
    const lat = (datas[0].lat)
    const lng = (datas[0].lon)
    this.lat = lat
    this.lng = lng
    L.marker(lat, lng).addTo(map);
    map.flyTo([lat, lng], 8);
    
  }

  // enregistrement d'un PI
  public addPI() {
    this.http.post(BASE_URL + '/pi/add_pi/', {
        title: this.title,
        age_id: this.age_id,
        categorie_id: this.categorie_id,
        lat: this.lat,
        lng: this.lng,
        content: this.content,
      }, {
        withCredentials: true,
      })
      .subscribe({
        next: () => this.router.navigateByUrl("/"),
        error: (e) => console.log(e, "op", this.title, "cat = ", this.categorie_id, "age= ", this.age_id)
      })
  }
  submit(): void {
    if (this.formAddPI.valid) {
      this.addPI()
    } else {}
  }

  public showAge(){
    this.http.get < Age[] > (BASE_URL + `/ages`, {
      withCredentials: true
    })
    .subscribe((response: Age[]) => {
      this.ages = response
    })
  }
  public showCategorie(){
    this.http.get < Categorie[] > (BASE_URL + `/categories`, {
      withCredentials: true
    })
    .subscribe((response: Categorie[]) => {
      this.categories = response
    })
  }
  public selectCategorie(id:number){
    this.categorie_id = id
  }
  public selectAge(id:number){
    this.age_id = id
  }
}
