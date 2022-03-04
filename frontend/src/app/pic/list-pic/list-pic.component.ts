import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RUN } from '../../interfaces/PI';
import { BASE_URL } from '../../global';

@Component({
  selector: 'app-list-pic',
  templateUrl: './list-pic.component.html',
  styleUrls: ['./list-pic.component.css']
})
export class ListPicComponent implements OnInit {

  public pic: RUN.PIC[]= []
  public name : string = ''
  public categorie : string = ''
  public lat : number = 0
  public lng : number = 0
  public categorieSelected : string=''
  public restaurantIsVisible : boolean = false
  public hotelIsVisible : boolean = false
  public barIsVisible : boolean = false
  public allIsVisible : boolean = true

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
   this.showAllPic()
  }

  public showAllPic() {
    return this.http.get < RUN.PIC[] > (BASE_URL + '/pic/', {
      withCredentials: true})
      .subscribe((response: RUN.PIC[]) => {
        console.log(response, 'reponse')
        this.pic = response
        this.allIsVisible =true
        this.restaurantIsVisible =false
        this.barIsVisible =false
        this.hotelIsVisible =false
      }
        )
      
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
  }

