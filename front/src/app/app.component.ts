import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient) {
    console.log('------>',Math.random());
  }

  ngOnInit(){

  }

  test_api() {
    let username = 'bhomaram';
    let password = 'bhoma@123';
    this.http.post('https://localhost:3000/api/auth/login', {username: username, password: password}).subscribe(
      (response: Response) => {
        console.log('response----->',response);
      }, error => {
        console.log('Server error, pls try again.',error);
      });


    // this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
    //   .pipe(map(user => {
    //     if (user && user.token) {
    //
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //
    //     return user;
    //   }));
  }
}
