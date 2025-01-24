import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/app.routes';
import {HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from '@angular/common/http';
import {Observable} from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
}).catch((err) => console.error(err));

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem("jwt")}`)
  });

  console.log('я тут наинтерсептил:', clonedRequest);

  return next(clonedRequest);
}
