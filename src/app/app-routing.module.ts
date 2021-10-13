import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'category/:id', component: CategoryComponent },
  { path: 'my-cart', component: MyCartComponent },
  {path: 'product/:id', component:ProductDetailComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
