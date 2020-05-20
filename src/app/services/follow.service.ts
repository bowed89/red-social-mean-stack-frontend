import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url = GLOBAL.url;

  constructor(
    private http: HttpClient
  ) { }

  addFollow(token, follow): Observable<any> {

    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.post(this.url + 'follow', params, { headers });

  }

  deleteFollow(token, id) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.delete(this.url + 'follow/' + id, { headers });
  }

  getFollowing(token, userId = null, page = 1): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    var url = this.url + 'following/';

    if (userId != null) {
      url = this.url + 'following/' + userId + '/' + page;

    }
    return this.http.get(url, {  headers} );

  }

  getFollowed(token, userId = null, page = 1): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    var url = this.url + 'followed/';

    if (userId != null) {
      url = this.url + 'followed/' + userId + '/' + page;

    }
    return this.http.get(url, {  headers} );

  }

  getMyFollows(token): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this.http.get(this.url + 'get-my-follows/true', {headers} );


  }

}

