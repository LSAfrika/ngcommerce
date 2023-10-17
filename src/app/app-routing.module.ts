import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) },
  { path: 'store', loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule) },
  { path: 'admin', loadChildren: () => import('./pages/adminpanel/adminpanel.module').then(m => m.AdminpanelModule) },
  { path: 'product/:productid', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),canActivate:[LoginGuard] },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),canActivate:[LoginGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./pages/nf404/nf404.module').then(m => m.Nf404Module) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
