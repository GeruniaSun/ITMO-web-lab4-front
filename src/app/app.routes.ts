import { Routes } from '@angular/router';
import {PageEnterComponent} from './page-enter/page-enter.component';
import {PageMainComponent} from './page-main/page-main.component';
export const routes: Routes = [];
const routeConfig: Routes = [
  {
    path: '',
    component: PageEnterComponent,
    title: 'Home page',
  },
  {
    path: 'main',
    component: PageMainComponent,
    title: 'Home details',
  },
];
export default routeConfig;
