import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) }, 
  { path: 'product/:productid', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) }, 
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) }, 
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
  { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) },
  { path: 'store', loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule) },
  { path: '**', loadChildren: () => import('./pages/nf404/nf404.module').then(m => m.Nf404Module) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
