import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAnnonceComponent } from './components/add-annonce/add-annonce.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AnnonceReservationComponent } from './components/annonce-reservation/annonce-reservation.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';



const routes: Routes = [
  // http://localhost:4200/signup
  { path: "signup", component: SignupComponent },
  { path: "SignupAdmin", component: SignupComponent },

  // http://localhost:4200/login
  { path: "login", component: LoginComponent },

  // http://localhost:4200/
  // http://localhost:4200/home
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },

  // http://localhost:4200/add annonce 
  { path: "add-annonce", component: AddAnnonceComponent },

  // http://localhost:4200/User Dashboard
  { path: "user-dashboard", component: UserDashboardComponent },

  // http://localhost:4200/Admin Dashboard
  { path: "admin-dashboard", component: AdminDashboardComponent },

  // http://localhost:4200/Annonce Details
  { path: "annonceDetails/:id", component: DetailsComponent },

  // http://localhost:4200/Market
  { path: "Marketplace", component: MarketplaceComponent },


    // http://localhost:4200/Annonce reservation
    { path: "annonceReservation/:id", component: AnnonceReservationComponent},

  // http://localhost:4200/Shop
  { path: "shop", component: ShopComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
