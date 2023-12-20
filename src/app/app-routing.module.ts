import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) },
  { path: 'store', loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule) },
  { path: 'admin/:adminid', loadChildren: () => import('./pages/adminpanel/adminpanel.module').then(m => m.AdminpanelModule),canActivate:[AdminGuard] },
  { path: 'product/:productid/store/:storeid', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),canActivate:[AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),canActivate:[LoginGuard] },
  { path: 'checkout/:status', loadChildren: () => import('./pages/stripe/stripe.module').then(m => m.StripeModule),canActivate:[AuthGuard]  },
  { path: '**', loadChildren: () => import('./pages/nf404/nf404.module').then(m => m.Nf404Module) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
