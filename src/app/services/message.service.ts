import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   register(token, message): Observable<any> {

    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.post(this.url + 'message', params, { headers });

  }

  getMyMessages(token, page = 1): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.get(this.url + 'my-messages/' + page, { headers });

  }

  getEmmitMessages(token, page = 1): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.get(this.url + 'messages/' + page, { headers });

  }

}