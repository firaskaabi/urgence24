import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-compteprofessionnel',
  templateUrl: './compteprofessionnel.component.html',
  styleUrls: ['./compteprofessionnel.component.css']
})
export class CompteprofessionnelComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  focus2;
  form:FormGroup;

  listCategories=["Categories","Médecin","Urgence","Hopital","Clinique","Pharmacie","Ambulance","Laboratoire","Parapharmacie"]
  listRegions=["Région","Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Moanstir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]

  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router) { 
      this.form = this.fb.group({
        adresse: ['',Validators.required],
        phone_numbre: ['',Validators.required],
        email: ['',Validators.required],
        username: ['',Validators.required],
        role:['',Validators.required],
        firstName: ['',Validators.required],
        lastName:['',Validators.required],
        region:['',Validators.required],
        categorie:['',Validators.required],
        phone_number:['',Validators.required],
        password: ['',Validators.required]
    });
    }

    signup() {
      const val = this.form.value;
      console.log(val)

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }
  ngOnInit(): void {
  }

}
