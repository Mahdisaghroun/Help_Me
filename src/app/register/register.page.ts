import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './../service/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database/';
import { map, finalize } from 'rxjs/operators';
import { ValidateNum } from './validators/verifNum';
import { UserModel } from './../modal/userModel/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  disabled=false;
  percentLoad = false;
  registerForm: FormGroup;
  msg="";
  fileDelete;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  res: AngularFireList<any>;
  User = new  UserModel();
  constructor( private storage: AngularFireStorage,private db : AngularFireDatabase ,private route: Router,private auth: AuthService, private Form: FormBuilder, private loadingController : LoadingController) { }

  ngOnInit() : void {
this.formInit();

  }
 

  onclick() {
    
  
    
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const idStudent = this.registerForm.get('numE').value;
    this.User.FirstName=this.registerForm.get('firstn').value;
    this.User.LastName=this.registerForm.get('lastn').value;


    this.User.Image=this.registerForm.get('Image').value;

    this.res = this.db.list('numE',ref=>ref.orderByChild("num").equalTo(idStudent));
    this.res.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(response =>{
      if(response.length!=0){
     
        this.presentLoading();
        this.auth.register(email, password).then(
          () => {
            this.auth.createUser(this.User);
 
         
            this.loadingController.dismiss();
           
            
          },
          (error) => {
            this.msg = error;
            this.loadingController.dismiss();
           
          }
        );
    
      }
      else{
        this.msg ="Student ID invalid ";
        this.loadingController.dismiss();
      }
      }
    
  
    )}
   
  get NumIn(){
    return this.registerForm.get('numE').value;

  }
  uploadFile(event) {
    var n =Date.now();
    const file = event.target.files[0];
    const filePath = `usersFiles/${n}`;
    this.fileDelete=n;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes

    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(
      ()=>{this.percentLoad=true},
      ()=>{},
      ()=>{this.disabled=true;
      this.percentLoad=false;}

    )


    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
   deleteFile(){
   this.storage.ref('/usersFiles/'+this.fileDelete).delete();
   this.disabled=false;

   }
  

  formInit() {
    this.registerForm = this.Form.group(
      {
        email: ['', [Validators.email]],
        password: ['', [Validators.pattern(/[a-zA-Z0-9]{6,}/), Validators.required]],
        firstn : [''],
        lastn : [''],
        numE : ['', [Validators.pattern(/[0-9]{8}/), Validators.required]],
        Image : [''],
        
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

