import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errors: any;

  constructor(private service: AuthService, private router: Router) { }

  register(data) {
    this.service.register(data)
      .subscribe(result => {
        this.router.navigate(['/login'])
      },
        (error: Object) => {
          this.errors = error
        });
  }

}
