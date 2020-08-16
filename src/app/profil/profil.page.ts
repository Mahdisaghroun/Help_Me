import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './../service/modalpage';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserModel } from './../modal/userModel/user';
import { AuthService } from './../service/auth.service';
import { map } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit , OnDestroy {
user:string;
name;
lastname;
image;

userData:UserModel []=[];
  constructor(private route : ActivatedRoute, private nav :NavController ,private auth : AuthService,private loadingController : LoadingController) {
   
    this.route.queryParams.subscribe(params => {
      this.user = params["user"];
this.getUserData(this.user);
this.presentLoading();
  });


   }
  goBack(){
this.nav.back();
  }
  getUserData(key : string ){
  
    this.auth.getUserData(key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(userdata => {
    
       this.userData=userdata;
       for(let user of this.userData){
         this.name=user.FirstName;
         this.lastname=user.LastName;
         this.image=user.Image;
       }


    
     
    });}
  ngOnInit() {
  
   
  }
  dims(){
    this.loadingController.dismiss();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    
    });
    await loading.present();
 
    
  }
  ngOnDestroy(){
    this.dims();
  }

}
