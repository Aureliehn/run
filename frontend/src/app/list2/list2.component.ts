import {
  Component,
  OnInit
} from '@angular/core';
import * as L from 'leaflet';
window.L = L
import Geocoder from 'leaflet-control-geocoder';
import 'leaflet-gpx';

@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.css']
})
export class List2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const centre = {
      lat: 46.77668,
      lng: 3.07722
    };
    var script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js'

    var script2 = document.createElement('script')
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js'

    document.body.append(script)
    document.body.append(script2)


    const mapGpx = L.map('mapGpx').setView(centre, 5);
    const distance : number = 0
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapGpx);

    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(mapGpx);
    GeocoderControl.on('markgeocode', function (e) {
      console.log(e);
    })

    this.getLocation()

    script2.addEventListener('load', () => {
      var afficherDistance = document.getElementById("distance")
      var afficherD = document.getElementById('denivele')
      var afficherAltHaute= document.getElementById('altPlusHaute')
      var afficherAltBasse= document.getElementById('altPlusBasse')
      var afficherPerteAlt= document.getElementById('perteAlt')
      var gpx = 'assets/gpx/PARIS.gpx'; 
      new L.GPX(gpx, {
        async: true,
        marker_options: {
          startIconUrl : 'assets/images/markerGreen.png'
        }
      }).on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_elevation_gain());
        var denivele = e.target.get_elevation_gain()
        afficherD!.innerHTML = "Dénivelé cumulé : " + parseFloat(denivele).toFixed(2) +" mètres"
      }).on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_distance())
      var distance = e.target.get_distance()
      var dKM = distance/1000
      afficherDistance!.innerHTML = "Distance : " + parseFloat(distance).toFixed(2)+" mètres soit : "+ dKM + " km" 
      }).on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_elevation_min_imp())
      var altBasse = e.target.get_elevation_min_imp()
      afficherAltBasse!.innerHTML = "Altitude la plus basse : " + parseFloat(altBasse).toFixed(2) + ' mètres'
      }).on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_elevation_max_imp())
      var altHaute = e.target.get_elevation_max_imp()
      afficherAltHaute!.innerHTML = "Altitude la plus haute : " + parseFloat(altHaute).toFixed(2) + ' mètres'
      }).on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_elevation_loss_imp())
      var perteAltitude = e.target.get_elevation_loss_imp()
      afficherPerteAlt!.innerHTML = "Perte d'altitude : " + parseFloat(perteAltitude).toFixed(2) + ' mètres'
      })
      .addTo(mapGpx);
    })

  }

  // localisation de l'utilisateur
  public getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.callApi(longitude, latitude);
      })
    } 
  }

  public callApi(Longitude: number, Latitude: number) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
  }


}
