import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.page.html',
  styleUrls: ['./welcome-view.page.scss'],
})
export class WelcomeViewPage implements OnInit {
user : User;
  constructor() { 
  
  }

  ngOnInit() {
  }
 
}
