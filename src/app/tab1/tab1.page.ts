import { Component, OnInit, ViewChild} from '@angular/core';
import { ActionSheetController, ModalController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from './../service/auth.service';
import { ModalPage } from './../modal/modal.page';
import { ModalService } from './../service/modalpage';

import { PostService } from './../service/postService';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { UserModel } from './../modal/userModel/user';
import { User } from 'firebase';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

 currentPost:any[];
curentUser: UserModel[]=[];
posts : any;
userData :UserModel[];
oneUser:UserModel;
user :User;
isLoading=true;
show=true;

  constructor(private route : Router,private post : PostService,private model: ModalService ,
    public actionSheetController: ActionSheetController,
     private auth : AuthService, public modalController: ModalController,
     private nav : NavController) {

    
     }
 ngOnInit(){
 
   this.curentUser=[];
   this.user=JSON.parse(localStorage.getItem('user'));
   this.getCurrent(this.user.uid);
  
this.userData=[];
this.posts=[];
   this.getCustomersList();



 }
 
 doRefresh(event){
  setTimeout(() => {
    this.getCustomersList();

    event.target.complete();
  
  }, 2000);
 }
 
  showmodal(a ){
this.model.presentModal(ModalPage,a);

  }
  goToProfil(user :string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": user,
         
      }
  };
  this.route.navigate(['profil'],navigationExtras);
  }
  getCurrent(key :string){
    this.auth.getUserData(key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(userdata => {
    
       this.curentUser=userdata;
       for(let current of this.curentUser){
       this.user.photoURL=current.Image;
       this.user.displayName=current.FirstName+" "+current.LastName;
       localStorage.setItem('currentUser',JSON.stringify(this.user));}
    
     
    });}
  
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
     this.oneUser=user;
     console.log(this.oneUser);
   }
  
 
});}
  loadMore(event){
    setTimeout(() => {
      console.log('Done');
      this.load();
      event.target.complete();
 
    }, 2000);
  }
  
  load(){
    
    this.post.loadNext().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.posts = customers;
      for(let post of this.posts ){
        this.getUserData(post.user);
        post.userData=this.userData[0];
     
        
      }
      
    });
   
  }
  getCustomersList() {
    this.post.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.posts = customers;
    
    });
  }
  doRef(){
    this.getCustomersList();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Account Setting ',
      buttons: [{
        text: 'View Account',
        role: 'destructive',
        icon: 'trash',
        handler:   () => {
    
      this.goToProfil(this.user.uid);

        
          }
        
      }, {
        text: 'Log Out',
        icon: 'share',
        handler: () => {
        this.auth.logout().then(
          ()=>{
            localStorage.clear();
            this.route.navigate(['/login']);
            
          

          },
          (error)=>{
            alert(error);
          }
        );
        }
      }, {
        text: 'Create Post ',
        icon: 'arrow-dropright-circle',
        handler: () => {
         this.route.navigate(['create-post']);
        }
      }, {
        text: 'Cuurent User',
        icon: 'heart',
        handler: () => {
               }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
}

