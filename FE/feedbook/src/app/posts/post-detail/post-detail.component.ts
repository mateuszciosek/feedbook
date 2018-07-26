import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../shared/models/post.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  private dataUrl = environment.apiUrl + 'posts/';

  public post: any;
  // public comments: any;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient, ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.data.getDetails(this.dataUrl, id)
      .subscribe((response: Post) => {
        this.post = response
        console.log(this.post)
      },
        error => {
          if (error.status == 404) {
            this.router.navigate(['/posts'])
          }
        }
      );

    // this.data.getAll(this.dataUrl + id + '/comments/')
    //   .subscribe((response: any) => {
    //     this.comments = response
    //   })
  }

  delete(id) {
    this.data.delete(id)
      .then(() => this.router.navigate(['/posts']))
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  likePost() {
    let id = this.route.snapshot.paramMap.get('id');

    this.http.post(this.dataUrl + id + '/like/', null)
      .subscribe((response: any) => {
        this.post.likesCount = response.likesCount
        this.post.liked = response.liked
      })
  }

  dislikePost() {
    let id = this.route.snapshot.paramMap.get('id');

    this.http.delete(this.dataUrl + id + '/like/')
      .subscribe((response: any) => {
        this.post.likesCount = response.likesCount
        this.post.liked = response.liked
      })
  }

}
