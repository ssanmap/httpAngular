import { Component } from '@angular/core';
import { pipe } from 'rxjs';

import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  imgParent = '';
  showImg = true;
  token= '';
constructor(private AuthService:AuthService, private UsersService:UsersService){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UsersService.create({ name: 'Sebas', email: 'sebas@mail.com', password: '1212' })
    .subscribe(res => {
      console.log(res)
    })
  }
  login() {
    this.AuthService.login('sebas@mail.com', '1212')
      .subscribe(res => {
        this.token = res.access_token;
        console.log(this.token)
   })
  }

  getProfile() {
    this.AuthService.profile(this.token)
      .subscribe(res => {
        console.log(res)
      })
  }
}
