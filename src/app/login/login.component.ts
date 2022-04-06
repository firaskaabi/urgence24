import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  form:FormGroup;
  userInfo
  
  constructor(private fb:FormBuilder, private router: Router,private authService:AuthService ) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
   }

   login() {
    const val = this.form.value;

    if (val.email && val.password) {
       this.authService.login(val.email, val.password)
            .subscribe( (res) =>{
              this.userInfo=res.body;
              console.log(res.headers.get('Authorization'))
              localStorage.setItem('jwt-token',res.headers.get('Authorization'))
                    console.log(res.headers.get('Date'))
                    this.router.navigateByUrl('/myprofil/'+this.userInfo.id);
            }
            );
    }
}

  ngOnInit() {
  }

}
