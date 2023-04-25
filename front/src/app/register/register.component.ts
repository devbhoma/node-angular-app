import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit{
  title = 'app';

  constructor(private router: Router,
              private http: Http) {


  }

  ngOnInit(){
    console.log('RegisterComponent')
  }
}
