import { FileService } from './_service/file.service';
import { UserToCreate } from './_interfaces/userToCreate.model';
import { User } from './_interfaces/user.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCreate: boolean = false;
  name: string;
  address: string;
  user: UserToCreate;
  users: User[] = [];
  response: {dbPath: ''};
  photos: string[] = [];
  imageName: string ='';
  filename: string='';

  constructor(private http: HttpClient, private fileService: FileService){}

  ngOnInit(){
    this.isCreate = true;
  //  this.getPhotos();
    this.getUsers();
  }

  private getPhotos = () => {
    this.fileService.getPhotos()
    .subscribe(data => this.photos = data['photos'])
  }

  onCreate = () => {
    this.user = {
      // name: this.name,
      // address: this.address,
      name: 'Felix Battig',
      address: '123 aaaa street',
      imgPath: this.response.dbPath
    }

    this.http.post('https://localhost:5001/api/users', this.user)
    .subscribe({
      next: _ => {
        this.getUsers();
     //   this.isCreate = false;
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  private getUsers = () => {
    this.http.get('https://localhost:5001/api/users')
    .subscribe({
      next: (res) => this.users = res as User[],
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  returnToCreate = () => {
    this.isCreate = true;
   // this.name = '';
   // this.address = '';
    this.getPhotos();
  }

  uploadFinished = (event) => { 
    this.response = event; 
   
      this.imageName = this.response.dbPath ;
      this.filename = this.imageName.split('\\').pop();
    //  var filename = location.pathname.substr(location.pathname.lastIndexOf("/")+1);
    
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:5001/${serverPath}`; 
  }
}
