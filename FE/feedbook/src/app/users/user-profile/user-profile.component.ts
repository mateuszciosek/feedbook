import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user.model';
import { DataService } from '../../shared/services/data/data.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private userUrl = environment.apiUrl + 'users/';
  public userId = localStorage.getItem('userId')

  public user;

  constructor(
    private auth: AuthService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')

    this.data.getDetails(this.userUrl, id)
      .subscribe(
        response => {
          this.user = response
        },
        error => {
          if (error.status == 404) {
            this.router.navigate(['/'])
          }
        });
  }

}
