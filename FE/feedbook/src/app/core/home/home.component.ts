import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authentication: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated()
  }
}
