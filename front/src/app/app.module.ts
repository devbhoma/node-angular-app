import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "./_services/authentication.service";
import {RegisterComponent} from "./register";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {DocumentComponent} from "./document";

const config: SocketIoConfig = { url: 'https://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    //customHttpProvider,
    AuthenticationService,
    [{
      provide: APP_BASE_HREF,
      useValue: environment.apiUrl
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
