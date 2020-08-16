import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { AuthService } from './../service/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  loginForm: FormGroup;
  msg="";
  is:boolean;
  user:User;

  constructor( private afAuth:AngularFireAuth,private route: Router,private auth: AuthService, private Form: FormBuilder, private loadingController : LoadingController) { }

  ngOnInit() : void {
this.formInit();

  }
 
  onclick() {
     
    this.isLoading = true;
    this.presentLoading();
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password).then(
      () => {
      
     
        this.afAuth.authState.subscribe((user)=>{
          localStorage.setItem('user',JSON.stringify(user));
          console.log(user);
         
        })
          
        this.isLoading = false;
       
        this.loadingController.dismiss().then(
          ()=>{
          
            this.route.navigate(['welcome-view']);
          }
        );
         

       
    
 
        
 
      },
      (error) => {
        this.loadingController.dismiss();
        this.msg = error;
      
       
      }
    );

  }

  formInit() {
    this.loginForm = this.Form.group(
      {
        email: ['', [Validators.email]],
        password: ['', [Validators.pattern(/[a-zA-Z0-9]{6,}/), Validators.required]]
      }
    )
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    
    });
    await loading.present();
 
    
  }

}


