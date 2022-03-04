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

@Component({
  selector: 'app-form-pic',
  templateUrl: './form-pic.component.html',
  styleUrls: ['./form-pic.component.css']
})
export class FormPicComponent implements OnInit {
  public addres : string = ""
  constructor() {}

  ngOnInit(): void {
    let macarte = L.map('carte').setView([46, 2], 6)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données OpenSreetMap France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte)
    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(macarte);
    GeocoderControl.on('markgeocode', function (e) {
      console.log(e.geocode.name)
    })
  }

}
