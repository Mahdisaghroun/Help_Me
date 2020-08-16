import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, NavController, AlertController, Platform } from '@ionic/angular';
import { Tab1Page } from './../tab1/tab1.page';
import { ModalService } from './../service/modalpage';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Post } from './../postModel/postmodel';
import { PostService } from './../service/postService';
import { Reply } from './../postModel/ReplyModel';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {
  
  post:any;
replyData:any[];
user:User;

  constructor(private route:Router,private postservice:PostService,public  model : ModalService  , private alertController : AlertController, navParams: NavParams) { 
this.replyData=[];
this.user=JSON.parse(localStorage.getItem('currentUser'));
    this.post=navParams.get('posts');
  
 this.setReply();
    

  }

  ngOnInit() {
   
  }
 
 setReply(){
if(this.post.reply)
 Object.keys(this.post.reply).map((key)=>{
      this.replyData.push(this.post.reply[key])
      console.log(this.replyData);
      return this.replyData;
     
    });

  }
  viewProfil(user :string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": user,
         
      }
  };
  this.dimiss();
  this.route.navigate(['profil'],navigationExtras);
  }
  dimiss(){
    this.model.dismiss();
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Write Reply',
      inputs: [
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            const r=new Reply(Date.now().toString(),this.user.uid,data.paragraph,this.user.photoURL,this.user.displayName)
            this.postservice.postReply(r,this.post.key);
            console.log(r);
            this.replyData.push(r);
           
          }
        }
      ]
    });
  await alert.present();
}


}
