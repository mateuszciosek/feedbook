import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtService } from '../jwt/jwt.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';



@Injectable()
export class AuthService {
  private registerUrl = environment.apiUrl + 'register/';
  private loginUrl = environment.apiUrl + 'api/token/';
  private refreshTokenUrl = environment.apiUrl + 'api/token/refresh/';

  private userSubject: Subject<User | null> = new ReplaySubject(1);
  public user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  register(data) {
    return this.http.post(this.registerUrl, data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error.error)
      })
  }

  login(credentials): Observable<boolean> {
    return this.http.post(this.loginUrl, credentials)
      .map((response: any) => {
        if (response.access && response.refresh) {
          this.userSubject.next(new User({ username: this.jwtService.decodeUsername(response.access) }))
          this.jwtService.setTokenAndRefreshAndUsername(response.access, response.refresh)
          return true;
        } else {
          return false;
        };
      });
  }

  logout() {
    this.userSubject.next(null);
    this.jwtService.removeTokenAndUsername();
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.jwtService.tokenNotExpired();
  }

  refreshToken() {
    if (this.isAuthenticated()) {
      const refresh_token = this.jwtService.getRefreshToken();
      this.http.post(this.refreshTokenUrl, refresh_token)
        .map((response: any) => {
          if (response.access) {
            this.userSubject.next(new User({ username: this.jwtService.decodeUsername(response.access) }));
            this.jwtService.setTokenAndUsername(response.access);
            return true
          } else {
            return false
          }
        })
        .subscribe();
    }
  }

}
