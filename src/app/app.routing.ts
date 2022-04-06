import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { Home2Component } from './home2/home2.component';
import { CompteprofessionnelComponent } from './compteprofessionnel/compteprofessionnel.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { PharmacieComponent } from './pharmacie/pharmacie.component';
import { LaboratoireComponent } from './laboratoire/laboratoire.component';
import { UrgenceComponent } from './urgence/urgence.component';
import { ParapharmacieComponent } from './parapharmacie/parapharmacie.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { ProfilmedComponent } from './profilmed/profilmed.component';
import { MapComponent } from './map/component/map.component';
import { MapViewComponent } from './map/component/map-view/map-view.component';
import { AddMedecinComponent } from './ajouter/component/add-medecin/add-medecin.component';
import { CliniqueComponent } from './clinique/clinique.component';
import { MyProfilComponent } from './auth/my-profil/my-profil.component';
const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'myprofil/:id',     component: MyProfilComponent },

    { path:'user-profile/:id', component: ProfileComponent },
    { path:'register', component: SignupComponent },
    { path:'landing',component: LandingComponent },
    { path:'login',component: LoginComponent },
    { path:'home2',component: Home2Component},
    { path:'InscrirePro' ,component: CompteprofessionnelComponent },
    {path:'medecins' , component: MedecinsComponent },
    {path:'pharmacie', component: PharmacieComponent},
    {path:'labo' ,component: LaboratoireComponent},
    {path:'urgence', component: UrgenceComponent} ,
    {path:'parapharmacie' , component:ParapharmacieComponent },
    {path:'ambulance',component: AmbulanceComponent },
    {path:'clinique',component: CliniqueComponent },
    {path:'profilmed', component: ProfilmedComponent},
    {path:'map', component: MapComponent},
    {path:'map1', component: MapViewComponent},
    {path:'add/medecin', component: AddMedecinComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule {}
