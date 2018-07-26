import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  private dataUrl = environment.apiUrl + 'posts/';

  posts: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAll(this.dataUrl)
      .subscribe(response => {
        this.posts = response
      },
        error => {
          console.log(error)
        }
      )
  }

}
