import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = GLOBAL.url;
  public identity;
  public token;
  public stats;

  constructor(
    public http: HttpClient
  ) { }

  register(user: User): Observable<any> {
    // JSON convertido a STRING
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'register', params, { headers });
  }

  signup(user: any): Observable<any> {

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'login', params, { headers });
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;

  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  // obtenemos los contadores de following, followes, publications en el localStorage
  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats !== 'undefined') {
      this.stats = stats;
    } else {
      this.stats = null;
    }

    return this.stats;
  }

  // Obtener contadores de following, followes, publications
  getCounters(userId = null): Observable<any>  {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this .getToken() );

    if (userId != null) {
      return this.http.get(this.url + 'counters/' + userId, { headers });

    } else {
      return this.http.get(this.url + 'counters' , { headers });
    }

  }

  updateUser(user: User): Observable<any> {

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken() );

    return this.http.put(this.url + 'update-user/' + user._id, params, { headers } );
  }

  // OBTENER USUARIOS CON PAGINACION
  getUsers(page = null): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken() );

    return this.http.get(this.url + 'users/' + page, { headers } );

  }

    // OBTENER USUARIO CON ID
    getUser(id): Observable<any> {

      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken() );

      return this.http.get(this.url + 'user/' + id, { headers } );

    }



}
