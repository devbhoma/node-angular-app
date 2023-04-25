import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

const config:any = {
  apiUrl:'https://localhost:3000/'
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  currentUser:any = {};

  constructor(private http: HttpClient) {
    console.log('hello i\'m here');
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  login(username: string, password: string) {
    console.log('--> hello login');
    /*this.http.post('auth/login', {username: username, password: password}).subscribe(
      (response: Response) => {
        let data = response.json();
        if (typeof data.success != "undefined" && data.success) {
          callback(null, true);
        } else {
          callback(true, data.error);
        }
      }, error => {
        callback(true, 'Server error, pls try again.');
      });*/



    /*return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));*/
  }

  logout() {

    console.log('hello logout');
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
  }
}

