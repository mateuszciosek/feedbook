import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  private userId = localStorage.getItem('userId')

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.user$
  }

  logout() {
    this.auth.logout();
  }

}
