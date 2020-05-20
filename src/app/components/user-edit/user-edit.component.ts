import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title = 'Actualizar mis datos';
  public user: User;
  public status: string;
  public identity;
  public token;
  public url = GLOBAL.url;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log('desde user-edit', this.user);
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          // ACTUALIZAMOS LOS ELEMENTOS DEL LOCALSTORAGE
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          // SUBIR IMG DEL USUARIO
          this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            console.log(result.user);
            this.user.image = result.user.image;
            localStorage.setItem('identity', JSON.stringify(this.user));
          });
        }

      }, error => {
        this.status = 'error';
        {console.log(<any>error)}
      }
    );
  }

  public filesToUpload: Array<File>;
  fileChangeEvent($fileInput: any) {
    this.filesToUpload = <Array<File>>$fileInput.target.files;
  }

}
