export class Reply{
Date:string;
User:string;
Text:string;
Image:string;
fullName:string;
constructor(date:string,user:string,text:string,image:string,name:string){
this.Date=date;
this.User=user;
this.Text=text;
this.Image=image;
this.fullName=name;
}
}