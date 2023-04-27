import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import { GITHUB_ACCESS_TOKEN } from '../../../../github-access-token';

@Injectable()
export class GithubAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}` },
    });

    return next.handle(authRequest);
  }
}
