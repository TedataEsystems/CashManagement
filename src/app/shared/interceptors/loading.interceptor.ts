import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader :LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.method === 'GET' ) {
      return next.handle(request);
    }
    if (request.method === 'POST' ) {
      return next.handle(request);
    }

    this.loader.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.loader.idle();
      })
    );
  }
}
