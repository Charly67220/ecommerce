import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',    component: HomeComponent },
  { path: 'address', component: AddressComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'edit-address', component: EditAddressComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'login', component: LoginComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'product-single/:id', component: ProductsingleComponent},
  { path: 'profile-details', component: ProfileDetailsComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'about', component: AboutusComponent},
  { path: '**',    component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
