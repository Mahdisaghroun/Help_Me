import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database/';
import { map } from 'rxjs/operators';
import { UserModel } from './../modal/userModel/user';
import { User } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
user :User;
is : boolean;
key:string;
private dbPath = '/Users';
 
usersRef: AngularFireList<UserModel> = null;

private res: AngularFireList<any>;
  constructor(private router : Router,private  afAuth: AngularFireAuth , private db : AngularFireDatabase) { 
   this.usersRef = this.db.list(this.dbPath);
    
    
  }
  createUser(User: UserModel){
   return this.afAuth.authState.subscribe(authS=>{
      this.key=authS.uid;
      User.key=this.key;
     this.usersRef.push(User);});
 

  
   
  }
  getUserData(key : string){
   return  this.usersRef = this.db.list(this.dbPath,ref=>ref.orderByChild("key").equalTo(key));
    
  }
  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    
    
}
 
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification;
   
}

  async login(email: string, password: string):Promise<any> {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
 return result;
   

}
async register(email: string, password: string) {
  var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  this.sendEmailVerification();
  this.router.navigate(['login']);
}
get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return (user !== null) ? true : false;
}

}
