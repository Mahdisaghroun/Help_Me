import { Injectable } from '@angular/core';
import *as firebase from 'firebase';
import { Post } from './../postModel/postmodel';
import { Subject } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database/';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Reply } from './../postModel/ReplyModel';
@Injectable({
  providedIn: 'root'
})
export class PostService{
     private last;
  private dbPath = '/Post';

user:User;
  customersRef: AngularFireList<Post> = null;
  reply: AngularFireList<Reply> = null;
 
  constructor(private afAuth:AngularFireAuth, private db: AngularFireDatabase) {
    this.customersRef = db.list(this.dbPath,ref=>ref.orderByChild('date').limitToLast(7));
    this.last=7;
   
    

   
    }
  createPost(post: Post): void {

   
    this.customersRef.push(post);
  }
  postReply(reply:Reply,key:string):void{
    this.reply=this.db.list('/Post/'+key+'/reply');
    this.reply.push(reply);
  }

 
  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
  loadNext(): AngularFireList<Post>{
this.last+=3;
   return this.customersRef=this.db.list(this.dbPath,ref=>ref.orderByChild('date').limitToLast(this.last));

  }
 
  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
 
  getCustomersList(): AngularFireList<Post> {
    return this.customersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }

}
