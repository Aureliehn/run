import {
  Component,
  OnInit
} from '@angular/core';
import * as L from 'leaflet';
import {
  HttpClient
} from '@angular/common/http';
import {
  RUN
} from 'src/app/interfaces/PI';
import {
  PIService
} from 'src/app/services/p-i.service';
import {
  BASE_URL
} from 'src/app/global';

import {
  Router,
  NavigationExtras
} from '@angular/router';
// ANCHOR
type CatDesc = {
  name: string,
  label: string,
}
const catTypes: CatDesc[] = [{
    name: 'Châteaux',
    label: "Châteaux",
  },
  {
    name: 'Musées',
    label: "Musées",
  },
  {
    name: 'Nature',
    label: "Nature",
  },
  {
    name: 'Méditahèques',
    label: "Méditahèques", 
  },
  {
    name: 'Jardins',
    label: "Jardins",
  },
]
type AgeDesc = {
  name: string,
  label: string,
  ageBackground: string
}
const ageTypes: AgeDesc[] = [{
    name: 'Maternelle',
    label: "Maternelle",
    ageBackground:"#ffc44e"
  },
  {
    name: 'Primaire',
    label: "Primaire",
    ageBackground:"#90ee90"
  },
  {
    name: 'College',
    label: "College",
    ageBackground:"#ea5a63"
  }
]


// ANCHOR
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
  public pis: RUN.PointInteret[] = []
  public pi: RUN.PointInteret[] = []
  public categories: RUN.Categorie[] = []
  public ages: RUN.Age[] = []
  public ageName: RUN.Age[] = []
  public categorieName: RUN.Categorie[] = []
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
  public catTypes: CatDesc[] = catTypes
  public ageTypes: AgeDesc[] = ageTypes


  public catType: CatDesc;
  public ageType: AgeDesc;

  constructor(
    private http: HttpClient,
    private piService: PIService,
    private router: Router
  ) {
    this.catType = this.catTypes[0]
    this.ageType = this.ageTypes[0]
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
    this.http.get < RUN.PointInteret[] > (BASE_URL + `/filter/pis/${filtre}/${age}/`, {
        withCredentials: true
      })
      .subscribe((response: RUN.PointInteret[]) => {
        this.pis = response
        this.isVisible = true
      })
  }

  // Affichage de tous les PI
  public printListPiService(map: any) {
    this.piService.printListPi()
      .subscribe((response: RUN.PointInteret[]) => {
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
    this.http.get < RUN.PointInteret[] > (BASE_URL + `/pi/${id}`, {
        withCredentials: true
      })
      .subscribe((response: RUN.PointInteret[]) => {
        this.pi = response
        this.showCategorieName(id)
        const NavigationExtras: NavigationExtras = {

          state: {
            id: id,
            address: this.test,
            content: this.content,
            title: this.title,
            lat: this.lat,
            lng: this.lng,
            age: this.ages,
            categorie: this.categorieName,
            road: this.road,
            postCode: this.postCode
          }
        };
        this.router.navigate([`/detail`], NavigationExtras);
      })
  }

  public showCategorie() {
    this.http.get < RUN.Categorie[] > (BASE_URL + `/categories`, {
        withCredentials: true
      })
      .subscribe((response: RUN.Categorie[]) => {
        this.categories = response
      })
  }
  showCategorieName(id: number) {
    this.http.get < RUN.Categorie[] > (BASE_URL + `/categorie/${id}/`, {
        withCredentials: true
      })
      .subscribe((response: RUN.Categorie[]) => {
        this.categorieName = response
      })
  }
  public showAge() {
    this.http.get < RUN.Age[] > (BASE_URL + `/ages`, {
        withCredentials: true
      })
      .subscribe((response: RUN.Age[]) => {
        this.ages = response

      })
  }
  showAgeName(id: number) {
    this.http.get < RUN.Age[] > (BASE_URL + `/age/${id}/`, {
        withCredentials: true
      })
      .subscribe((response: RUN.Age[]) => {
        this.ageName = response
      })
  }
}
