import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/index';
import {DocumentComponent} from "./document";

const appRoutes: Routes = [
  { path: 'signup', component: RegisterComponent, data: {title: 'Signup',tutorial:"0",tutorial_tpye:""}},
  { path: 'socket', component: DocumentComponent, data: {title: 'Socket',tutorial:"0",tutorial_tpye:""}},

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
