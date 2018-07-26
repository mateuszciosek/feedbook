import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  private dataUrl = environment.apiUrl + 'posts/';

  public comments: any;

  commentBox: boolean = false;

  update: boolean = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.data.getAll(this.dataUrl + id + '/comments/')
      .subscribe((response: any) => {
        this.comments = response
        console.log(this.comments)
      })
  }


  popUpBox() {

  }

  reciveUpdate($event) {
    if ($event === true) {
      let id = this.route.snapshot.paramMap.get('id');

      this.data.getAll(this.dataUrl + id + '/comments/')
        .subscribe((response: any) => {
          this.comments = response
          console.log(this.comments)
        })
      this.update = false;
    }
  }

}
