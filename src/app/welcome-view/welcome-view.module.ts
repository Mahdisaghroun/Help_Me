import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeViewPageRoutingModule } from './welcome-view-routing.module';

import { WelcomeViewPage } from './welcome-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeViewPageRoutingModule
  ],
  declarations: [WelcomeViewPage]
})
export class WelcomeViewPageModule {}
