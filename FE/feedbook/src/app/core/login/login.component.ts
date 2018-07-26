import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  login(credentials) {
    this.service.login(credentials)
      .subscribe(result => {
        if (result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else {
          console.log(result);
        };
      });
  }

  showLocal() {
    console.log(localStorage)
    localStorage.getItem('refresh_token')
  }

}
