import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfilService {
  baseUrl="https://urg24.herokuapp.com"


  constructor(private http:HttpClient) { }

  editPosition(id,x,y){
   return  this.http.put(this.baseUrl+"/personnels/edit/position/"+id,{x, y})
  }
}
