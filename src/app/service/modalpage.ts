

import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './../modal/modal.page';
import { ProfilPage } from '../profil/profil.page';
import { Post } from './../postModel/postmodel';




@Injectable({
  providedIn: 'root'
})
export class ModalService{

  constructor(private modalController : ModalController ) { }
  
async presentModal(modell:any,post : any) {
    const modal = await this.modalController.create({
      component: modell,
      componentProps: {
     'posts' : post,

    }
      
      
    });
    return await modal.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
