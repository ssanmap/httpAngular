import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
    token = '';
  profile= "";

  constructor(
    private storeService: StoreService,
    private AuthService:AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('sebas@mail.com', '1212')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.AuthService.loginAndGet('maria@mail.com', '12345')
    .subscribe(user => {
      this.profile = user.email;
      this.token = '---';
    });
  }

  getProfile() {
    this.AuthService.profile()
    .subscribe(user => {
      //this.profile = user;
    });
  }

}
