import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthService } from './service/auth.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './AuthGuard/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalPageModule } from './modal/modal.module';
import { ModalService } from './service/modalpage';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from './../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CallDirective } from './call.directive'
import { Animation, NavOptions } from '@ionic/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';


@NgModule({
  declarations: [AppComponent, CallDirective],
  entryComponents: [],
  imports: [NgxIonicImageViewerModule, ReactiveFormsModule, BrowserModule, 


  IonicModule.forRoot(), AppRoutingModule, 
    ModalPageModule,
     AngularFireModule.initializeApp(environment.firebase),
     AngularFireDatabaseModule  ,
    AngularFireAuthModule,
  AngularFireStorageModule],


providers: [
  
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuardService,
    ModalService,

  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
