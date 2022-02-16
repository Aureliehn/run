import {
  Component,
  OnInit,
  Output,
  Input
} from '@angular/core';
import * as L from 'leaflet';
import {
  RUN
} from 'src/app/interfaces/PI';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-detail-pi',
  templateUrl: './detail-pi.component.html',
  styleUrls: ['./detail-pi.component.css']
})
export class DetailPiComponent implements OnInit {

  @Output() public pi: RUN.PointInteret[] = []

  public categories: RUN.Categorie[] = []
  public ages: RUN.Age[] = []
  public map: any
  public address: string = ""
  public road: string = ""
  public postCode: number = 0
  public title: string = ""
  public content: string = ""
  public id: number = 0
  public lat: number = 0
  public lng: number = 0
  public markerRed = L.icon({
    iconUrl: 'assets/images/markerRed.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  });

  constructor(
    private router: Router
  ) {
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {

      id: 0,
      address: ""
      content: ""
      title: ""
      lat: 0
      lng: 0
      age: []
      categorie: [],
      road: "",
      postCode: 0

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
    const centre = {
      lat: this.lat,
      lng: this.lng

    };

    this.map = L.map('map').setView(centre, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const marker = L.marker([this.lat, this.lng], {
      icon: this.markerRed
    }).addTo(this.map);
    marker.bindPopup("L'activité se trouve ici").openPopup();
  }

  navigateList() {
    this.router.navigateByUrl("/activity")
  }

}
