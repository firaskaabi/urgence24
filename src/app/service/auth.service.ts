import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl="https://urg24.herokuapp.com"
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
}

  login(email:string, password:string  ) {

    return this.http.post<Response>(this.baseUrl+'/auth/signin', {email, password} ,{ observe: 'response' })
        // this is just the HTTP call, 
        // we still need to handle the reception of the token
        
}
}
