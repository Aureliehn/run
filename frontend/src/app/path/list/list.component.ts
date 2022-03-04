import {
  Component,
  OnInit
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import Geocoder from 'leaflet-control-geocoder';
import * as gpx from 'leaflet-gpx';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // public map: any
  

  constructor() {

  }

  ngOnInit(): void {
    const centre = {
      lat: 46.77668,
      lng: 3.07722
    };
    const map = L.map('map').setView(centre, 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(map);
    GeocoderControl.on('markgeocode', function (e) {
      console.log(e);
    })
    this.getLocation()
      var gpx = 'assets/gpx/gpx1.gpx'; // URL to your GPX file or the GPX itself
      new L.GPX(gpx, {async: true}).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
    var url = 'assets/gpx/gpx1.gpx'; // URL to your GPX file
    new L.GPX(url, {
      async: true,
      marker_options: {
        startIconUrl: 'assets/images/markerGreen.png',
        endIconUrl: 'assets/images/markerGreen.png',
        shadowUrl: 'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-shadow.png'
      }
    }).on('loaded', function (e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
    
  }
  // localisation de l'utilisateur
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.callApi(longitude, latitude);
      });
    } else {
      console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
    //Call API
    console.log(url)
  }


}
