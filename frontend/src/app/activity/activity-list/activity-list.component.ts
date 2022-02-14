import {
  Component,
  OnInit
} from '@angular/core';
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
import {
  Router,
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  public lat: number = 0
  public lng: number = 0
  public categorieSelected: number = 0
  public ageSelected: number = 0
  public nom: string = ""
  public content: string = ""
  public name: string = ""
  public pis: PointInteret[] = []
  public pi: PointInteret[] = []
  public categories: Categorie[] = []
  public ages: Age[] = []
  public ageName: Age[] = []
  public categorieName: Categorie[] = []
  public title: string = ""
  public isVisible = false
  public ifClickAdress = false
  public icoNew = L.icon({
    iconUrl: 'assets/images/pin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]

  });
  public map: any
  public mapCard: any
  public address: string = ""
  public test: any
  public road: any
  public postCode: any


  constructor(
    private http: HttpClient,
    private piService: PIService,
    private router: Router
  ) {}


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
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.setLatLng(e.latlng.lat, e.latlng.lng)
    })
    this.map.on('locationfound', (e: L.LocationEvent) => {
      this.setLatLng(e.latlng.lat, e.latlng.lng)
    })
    this.printListPiService(this.map)
  }
  private setLatLng(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  // FUNCTION TO FILTER BY SOMETHING 
  public filterBy(filtre: number, map: any, age: number) {
    this.http.get < PointInteret[] > (BASE_URL + `/filter/pis/${filtre}/${age}/`, {
        withCredentials: true
      })
      .subscribe((response: PointInteret[]) => {
        console.log(response, "reponse")
        this.pis = response
        this.isVisible = true
        // console.log(this.pis.age.name)
        // console.log(this.pis.age[0])
        // let age = this.pis.map(a => a.age_id)
        // console.log(age, 'age')
        // for (var i = 0; i < age.length; i++) {
        //   console.log(age[i], 'age[i');
        // }
        // this.showCategorieName(this.categorieSelected)
        // this.showAgeName(this.ageSelected)
      })
  }

  // Affichage de tous les PI
  public printListPiService(map: any) {
    this.piService.printListPi()
      .subscribe((response: PointInteret[]) => {
        this.pis = response
        for (const d of response) {
          const marker = L.marker([d.lat, d.lng], {
            icon: this.icoNew
          }).addTo(map);
          marker.bindPopup(d.title);
        }
      })
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
    L.circle([this.lat, this.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 1000
    }).addTo(map);
    map.panTo([this.lat, this.lng])
    map.setView([this.lat, this.lng], 8);
  }


  public selectResult(filtre: number, age: number) {
    this.categorieSelected = filtre
    this.filterBy(filtre, this.map, age)
  }


  public async geodecode(lat: any, lng: any, id: number, content: string, title: string, age: any, categorie: any) {
    let url = `https://nominatim.openstreetmap.org/reverse/?format=json&&lat=${lat}&lon=${lng}`;
    let resp = await fetch(url);
    let datas = await resp.json();
    console.log(datas.address, "datas géodecode")
    this.test = datas.address.municipality
    this.ifClickAdress = true
    this.piSelected(id)
    this.content = content
    this.title = title
    this.lat = lat
    this.lng = lng
    this.ageName = age
    this.categorieName = categorie
    this.road = datas.address.road
    this.postCode = datas.address.postcode
  }

  piSelected(id: number) {
    this.http.get < PointInteret[] > (BASE_URL + `/pi/${id}`, {
        withCredentials: true
      })
      .subscribe((response: PointInteret[]) => {
        this.pi = response
        const NavigationExtras: NavigationExtras = {
          state: {
            id: id,
            address: this.test,
            content: this.content,
            title: this.title,
            lat: this.lat,
            lng: this.lng,
            age: this.ageName,
            categorie: this.categorieName,
            road: this.road,
            postCode: this.postCode
          }
        };
        this.router.navigate([`/detail`], NavigationExtras);
      })
  }

  public showCategorie() {
    this.http.get < Categorie[] > (BASE_URL + `/categories`, {
        withCredentials: true
      })
      .subscribe((response: Categorie[]) => {
        this.categories = response
      })
  }
  showCategorieName(id: number) {
    this.http.get < Categorie[] > (BASE_URL + `/categorie/${id}/`, {
        withCredentials: true
      })
      .subscribe((response: Categorie[]) => {
        console.log(response, "= cat")
        this.categorieName = response
      })
  }
  public showAge() {
    this.http.get < Age[] > (BASE_URL + `/ages`, {
        withCredentials: true
      })
      .subscribe((response: Age[]) => {
        this.ages = response
      })
  }
  showAgeName(id: number) {
    this.http.get < Age[] > (BASE_URL + `/age/${id}/`, {
        withCredentials: true
      })
      .subscribe((response: Age[]) => {
        console.log(response, "=age")
        this.ageName = response
      })
  }
}
