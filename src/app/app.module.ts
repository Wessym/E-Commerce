import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderGuestComponent } from './components/header-guest/header-guest.component';
import { AddAnnonceComponent } from './components/add-annonce/add-annonce.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AnnoncesTableComponent } from './components/annonces-table/annonces-table.component';
import { DetailsComponent } from './components/details/details.component';
import { AnnonceReservationComponent } from './components/annonce-reservation/annonce-reservation.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HeaderInfoComponent,
    BannerComponent,
    ProductsComponent,
    HomeComponent,
    ShopComponent,
    HeaderAdminComponent,
    HeaderUserComponent,
    HeaderGuestComponent,
    AddAnnonceComponent,
    UserDashboardComponent,
    AnnoncesTableComponent,
    DetailsComponent,
    AnnonceReservationComponent,
    AdminDashboardComponent,
    ReservationTableComponent,
    MarketplaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
