import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  errors: any;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  create(content) {
    this.data.create(content)
      .subscribe((response: any) => {
        this.router.navigate(['/posts/' + response.id])
      },
        error => {
          this.errors = error;
        })
  }
}
