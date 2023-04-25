//
// import { Injectable } from "@angular/core";
// import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, CookieXSRFStrategy } from "@angular/http";
// import {ɵgetDOM as getDOM} from '@angular/platform-browser';
// import { CookieService } from 'ng2-cookies';
// import { environment } from '../../environments/environment';
//
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
// import {AuthenticationService} from "../_services/authentication.service";
// //import {Observable} from "rxjs/index";
// import { Observable } from "rxjs/Observable";
//
//
// @Injectable()
// export class CustomHttp extends Http {
//
//     constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, public cookieService: CookieService,private authenticationService: AuthenticationService) {
//         super(backend, defaultOptions);
//     }
//     request(url: string | Request, options?: RequestOptionsArgs){
//         let resp=super.request(url,options);
//
//         return resp.map((response: Response) => {
//             let token=response.headers.get('auth-token');
//             if(token!==null){
//                 if (token && token!='')
//                     localStorage.setItem('api_token', token);
//                 else {
//                     localStorage.removeItem('api-token');
//                     localStorage.removeItem('_root_user');
//                 }
//             }
//
//             let user=response.headers.get('auth-user');
//             if(user!==null){
//                 if (user && user!='')
//                     localStorage.setItem('currentUser', user);
//                 else localStorage.removeItem('currentUser');
//             }
//
//             return response;
//         });
//     }
//
//     get(url: string,  body: any,options?: RequestOptionsArgs): Observable<Response> {
//         return super.get(environment.apiUrl + url, this.addHeaders(options)).catch(this.handleError);
//     }
//
//     post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
//
//         let  xsrfToken = getDOM().getCookie('XSRF-TOKEN');
//         if (xsrfToken) {
//             body._csrf = xsrfToken;
//         }
//         return super.post(environment.apiUrl + url, body, this.addHeaders(options)).catch(this.handleError);
//     }
//
//     put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
//         return super.put(environment.apiUrl + url, body, this.addHeaders(options)).catch(this.handleError);
//     }
//
//     delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
//         return super.delete(environment.apiUrl + url, this.addHeaders(options)).catch(this.handleError);
//     }
//
//      addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
//         options = options || new RequestOptions();
//         options.headers = options.headers || new Headers();
//
//
//         options.headers.append('X-Request-API', 'App');
//
//         let lang = localStorage.getItem('_web_lang');
//
//         let offset:any = new Date().getTimezoneOffset();
//         let o = Math.abs(offset);
//         offset =  (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
//
//         options.headers.append('web-lang', lang ? lang : 'en-US');
//         options.headers.append('web-timezone', offset);
//
//         let api_token = localStorage.getItem('api_token');
//         if (api_token) {
//             options.headers.append('Authorization', 'Bearer ' + api_token);
//         }
//
//          let root_user = localStorage.getItem('_root_user');
//          if (root_user) {
//              options.headers.append('root-user', root_user);
//          }
//
//         let  xsrfToken = getDOM().getCookie('XSRF-TOKEN');
//         if (xsrfToken) {
//             options.headers.append('CSRF-TOKEN', xsrfToken);
//             options.headers.append('XSRF-TOKEN', xsrfToken);
//             options.headers.append('X-CSRF-TOKEN', xsrfToken);
//             options.headers.append('X-XSRF-TOKEN', xsrfToken);
//         }
//
//         return options;
//     }
//
//     private handleError(error: any) {
//         if (error.status === 401) {
//             // 401 unauthorized response so log user out of client
//             console.log('Session Expired, please login again.');
//             // this.authenticationService.logout((data)=>{
//             // });
//             localStorage.removeItem('currentUser');
//             localStorage.removeItem('api_token');
//             localStorage.removeItem('_root_user');
//             window.location.href = environment.baseUrl+'login';
//         }
//         return Observable.throw(error._body);
//     }
// }
//
// export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, cookieService: CookieService, authenticationService: AuthenticationService): Http {
//     return new CustomHttp(xhrBackend, requestOptions, cookieService,authenticationService);
// }
//
// export let customHttpProvider = {
//     provide: Http,
//     useFactory: customHttpFactory,
//     deps: [XHRBackend, RequestOptions]
// };
