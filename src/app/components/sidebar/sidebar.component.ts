import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;


  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication('', '', '', '', this.identity._id);
   }

  ngOnInit(): void {
  }

  onSubmit(form, $event) {
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {

          if (this.filesToUpload && this.filesToUpload.length) {
          // Subir img
          this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id, [],
           this.filesToUpload, this.token, 'image')
                              .then((result: any) => {
                                this.publication.file = result.image;
                                this.status = 'success';
                                form.reset();
                                this.router.navigate(['/timeline']);
                                this.sended.emit({ send: 'true' });

                              }); 
          } else {
            this.status = 'success';
            form.reset();
            this.router.navigate(['/timeline']);
            this.sended.emit({ send: 'true' });

          }




        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  public filesToUpload: Array<File>;
  filechangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  
  // Output
  @Output() sended = new EventEmitter();

  sendPublication(event) {
    this.sended.emit({ send: 'true' });
    console.log(event)
  }

}
