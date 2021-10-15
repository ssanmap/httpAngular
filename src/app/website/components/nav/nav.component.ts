import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  

  activeMenu = false;
  counter = 0;
    token = '';
  profile = "";
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories()
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

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      })

  }
  logout() {
    this.AuthService.logOut();
    this.profile = '';
    this.router.navigate(['/home'])


  }

}
