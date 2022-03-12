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
import { BASE_URL } from '../global';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-detail-pi',
  templateUrl: './detail-pi.component.html',
  styleUrls: ['./detail-pi.component.css']
})
export class DetailPiComponent implements OnInit {

  @Output() public pi: RUN.PointInteret[] = []

  header = [['Titre', 'Categorie', 'Age']]
  tableData : any[] =[]
  public pic: RUN.PIC[]= []
  public categorieSelected: string=''
  public hotelIsVisible : boolean = false
  public restaurantIsVisible : boolean = false
  public barIsVisible : boolean = false
  public allIsVisible : boolean = true
  public isNature : boolean = false
  public paris : boolean = false
  public changeMap : boolean = false
  public changeMap2 : boolean = false

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
  public markerGreen = L.icon({
    iconUrl: 'assets/images/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })
  public markerRed = L.icon({
    iconUrl: 'assets/images/markerRed.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })



  constructor(
    private http: HttpClient,
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
    this.header = [['Titre', 'Categorie', 'Age', 'Description', 'Code postal','Ville']]
    this.tableData = [[this.title, this.categories, this.ages, this.content, this.postCode, this.road]]
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

    L.circle([this.lat, this.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 20000
    }).addTo(this.map);
    const marker = L.marker([this.lat, this.lng], {
      icon: this.markerRed
    }).addTo(this.map);
    marker.bindPopup("L'activité se trouve ici").openPopup();
    this.showAllPic()
    this.showParcours()
  }

  navigateList() {
    this.router.navigateByUrl("/activity")
  }
  public selectResult(filtre: string) {
    this.categorieSelected = filtre
    this.filterBy(filtre)
    if (filtre === 'restaurant'){
      this.restaurantIsVisible = true
      this.allIsVisible = false
    }
  }
  public filterBy(filtre: string) {
    this.http.get < RUN.PIC[] > (BASE_URL + `/filter/pic/${filtre}/`, {
        withCredentials: true
      })
      .subscribe((response: RUN.PIC[]) => {
        this.pic = response
      })
  }
  public showAllPic() {
    return this.http.get < RUN.PIC[] > (BASE_URL + '/pic/', {
      withCredentials: true})
      .subscribe((response: RUN.PIC[]) => {
        console.log(response, 'reponse')
        this.pic = response
        for (const d of response) {
          const marker = L.marker([d.lat, d.lng], {
            icon: this.markerGreen
          }).addTo(this.map);
          marker.bindPopup(("<b>"+d.name+"</b><br/>"+d.categorie+"</b><br/>")) 
        }
      }
        )
      
    }
    generatePdf() {
      var pdf = new jsPDF();

      pdf.setFontSize(10);
      pdf.text('Activité : '+ this.title, 11, 8);
      pdf.setFontSize(12);
      pdf.setTextColor(99);


      (pdf as any).autoTable({
      head: this.header,
      body: this.tableData,
      theme: 'striped',
      fillColor: '#f8bbd0'
      })
      pdf.output('dataurlnewwindow')
      pdf.save('table.pdf');
  }  
  
  public showParcours(){
    if(this.id === 2){
      this.isNature = true
    }
    else if(this.id === 3){
      this.paris = true
    }
  }
  public clickShowParcours(){
    this.changeMap = true
  }
  public clickShowParcours2(){
    this.changeMap2 = true
  }

}

