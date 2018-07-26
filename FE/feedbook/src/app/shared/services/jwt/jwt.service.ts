import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtService {

  constructor(private jwtHelper: JwtHelperService) { }

  setTokenAndRefresh(token: string, refresh_token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  decodeUsername(token: string) {
    return this.jwtHelper.decodeToken(token).username;
  }

  getToken() {
    return this.jwtHelper.tokenGetter();
  }

  getRefreshToken() {
    const data = {
      'refresh': localStorage.getItem('refresh_token')
    }
    return data
  }

  removeToken() {
    localStorage.removeItem('token')
  }

  setUsername(token: string) {
    const username = this.jwtHelper.decodeToken(token).username;
    const userId = this.jwtHelper.decodeToken(token).user_id;
    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
  }

  removeUsername() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  setTokenAndRefreshAndUsername(token: string, refresh_token: string) {
    this.setTokenAndRefresh(token, refresh_token);
    this.setUsername(token);
  }

  setTokenAndUsername(token: string) {
    this.setToken(token);
    this.setUsername(token);
  }

  removeTokenAndUsername() {
    this.removeToken();
    localStorage.removeItem('refresh_token');
    this.removeUsername();
  }

  tokenNotExpired() {
    const token: string = this.jwtHelper.tokenGetter();
    if (token != null) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true
      }
      this.removeToken();
    }
    return false
  }

}
