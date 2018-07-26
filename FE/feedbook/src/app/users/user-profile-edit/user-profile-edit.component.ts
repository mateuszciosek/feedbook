import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  editForm: FormGroup;

  selectedFile: File = null;

  private userId = localStorage.getItem('userId')
  private profileUrl = environment.apiUrl + 'users/' + this.userId + '/';

  errors: any;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'email': new FormControl(null),
      'bio': new FormControl(null),
      'location': new FormControl(null),
      'profile_pic': new FormControl(null)
    });
  }

  updateProfile() {
    console.log(this.editForm.value)
    for (let control in this.editForm.controls) {
      if (!this.editForm.controls[control].dirty) {
        this.editForm.removeControl(control)
      }
    }

    this.data.update(this.profileUrl, this.editForm.value)
      .subscribe(result => {
        console.log(result)
        this.router.navigate(['/user/' + localStorage.getItem('userId')])
      },
        error => {
          this.errors = error
        })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(this.editForm.get('profile_pic'))
        this.editForm.get('profile_pic').setValue({
          filename: file.name,
          filetype: file.type,
          value: 'data:image;base64,' + reader.result.split(',')[1]
        })
      }
    }
  }
}
