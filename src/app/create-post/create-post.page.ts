import { Component, OnInit } from '@angular/core';
import { Post } from './../postModel/postmodel';
import { PostService } from './../service/postService';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './../service/auth.service';
import { User } from 'firebase';
import { Reply } from '../postModel/ReplyModel';




@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
submitted = false;
disabled=false;
percentLoad=false;
fileDelete ;

post : Post = new Post();
uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  user :User;
  constructor(private auth : AuthService,private postservice : PostService , private route : Router, private storage: AngularFireStorage) {
  
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
   }

  ngOnInit() {
  
  }


  
 
  
 
  onSubmit(form : NgForm) {
    
    this.submitted = true;
    this.post=form.value;
    this.post.date=Date.now();
    this.post.user=this.user.uid;
    this.post.imageUser=this.user.photoURL;
   this.post.fullName=this.user.displayName;

 

 
  
    console.log(this.post);
    this.postservice.createPost(this.post); 
    this.route.navigate(['/member']);

  }
  uploadFile(event) {
    var n =Date.now();
    const file = event.target.files[0];
    const filePath = `postFiles/${n}`;
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
   this.storage.ref('/postFiles/'+this.fileDelete).delete();
   this.disabled=false;

   }
}
