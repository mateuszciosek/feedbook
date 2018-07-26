import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-most-liked',
  templateUrl: './most-liked.component.html',
  styleUrls: ['./most-liked.component.scss']
})
export class MostLikedComponent implements OnInit {

  posts: any;

  private dataUrl = environment.apiUrl + 'posts/mostliked/';

  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getAll(this.dataUrl)
      .subscribe(response => {
        this.posts = response;
      })
  }

}
