import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent {

  private dataUrl = environment.apiUrl + 'posts/';
  public id = this.route.snapshot.paramMap.get('id');

  update: boolean = true;

  @Output() updateEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  post(data) {
    this.http.post(this.dataUrl + this.id + '/comments/', data.value)
      .subscribe(result => {
        console.log(result)
        this.sendUpdate()
      })
    data.resetForm();
  }

  sendUpdate() {
    this.updateEvent.emit(this.update)
  }

}
