import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl="https://urg24.herokuapp.com"


  constructor(private http:HttpClient) { }

  getAll(){
   return  this.http.get(this.baseUrl+"/personnels/all")
  }

  getByCategorie(categories){
    return  this.http.get(this.baseUrl+'/search/all/'+categories)
  }
  getByCategorieAndRegions(categories,region){
    return this.http.get(this.baseUrl+'/personnels/'+categories+'/'+region)
  }
  getByIdAndCategorie(id,categories){
    return this.http.get(this.baseUrl+'/personnels/'+id)
  }
}
