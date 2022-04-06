import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { Home2Component } from './home2/home2.component';
import { CompteprofessionnelComponent } from './compteprofessionnel/compteprofessionnel.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { ProfilmedComponent } from './profilmed/profilmed.component';
import { UrgenceComponent } from './urgence/urgence.component';
import { PharmacieComponent } from './pharmacie/pharmacie.component';
import { LaboratoireComponent } from './laboratoire/laboratoire.component';
import { ParapharmacieComponent } from './parapharmacie/parapharmacie.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { RegistreproComponent } from './registrepro/registrepro.component';
import { AddUrgenceComponent } from './ajouter/urgence/add-urgence/add-urgence.component';
import { AddMedecinComponent } from './ajouter/component/add-medecin/add-medecin.component';
import { ConatctUsComponent } from './shared/conatct-us/conatct-us.component';
import { HopitalComponent } from './hopital/hopital.component';
import { CliniqueComponent } from './clinique/clinique.component';
import { MyProfilComponent } from './auth/my-profil/my-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    Home2Component,
    CompteprofessionnelComponent,
    MedecinsComponent,
    ProfilmedComponent,
    UrgenceComponent,
    PharmacieComponent,
    LaboratoireComponent,
    ParapharmacieComponent,
    AmbulanceComponent,
    RegistreproComponent,
    AddUrgenceComponent,
    AddMedecinComponent,
    ConatctUsComponent,
    HopitalComponent,
    CliniqueComponent,
    MyProfilComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
