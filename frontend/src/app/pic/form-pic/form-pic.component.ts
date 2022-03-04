import {
  Component,
  OnInit
} from '@angular/core';
import * as L from 'leaflet';
import {
  BASE_URL
} from '../../global';
import {
  HttpClient
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import Geocoder from 'leaflet-control-geocoder'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-form-pic',
  templateUrl: './form-pic.component.html',
  styleUrls: ['./form-pic.component.css']
})
export class FormPicComponent implements OnInit {
  public address: string = ""
  public formAddPIC: FormGroup;
  public name: string = ''
  public categorie: string = ''
  public lat: number = 0
  public lng: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formAddPIC = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      categorie: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    let macarte = L.map('carte').setView([46, 2], 6)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données OpenSreetMap France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte)
    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(macarte);
    GeocoderControl.on('markgeocode', (e) => {
      this.address = e.geocode.name
      this.geocode(this.address, macarte)
    })
  }

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
  public addPIC() {
    this.http.post(BASE_URL + '/pic/add_pic/', {
        name: this.name,
        address: this.address,
        categorie: this.categorie,
        lat: this.lat,
        lng: this.lng,

      }, {
        withCredentials: true,
      })
      .subscribe({
        next: () => this.router.navigateByUrl("listPic"),
        error: (e) => console.log(e)
      })
  }
  submit(): void {
    if (this.formAddPIC.valid) {
      console.log('hello')
      this.addPIC()
    } else {
      console.log("bop", this.name, this.lat, this.lng, this.address, this.categorie)
    }
  }
 
}
