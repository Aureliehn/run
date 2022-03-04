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
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
   this.showAllPic()
   console.log(this.pic, 'pic')
  }

  public showAllPic() {
    return this.http.get < RUN.PIC[] > (BASE_URL + '/pic/', {
      withCredentials: true})
      .subscribe((response: RUN.PIC[]) => {
        this.pic = response})
    }
  }

