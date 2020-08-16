import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../service/auth.service';
import { User } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
user :User;
  constructor(private router : Router, private authService : AuthService) {
    this.user=JSON.parse(localStorage.getItem('user'));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.user==null) 
    
      this.router.navigate(['login']);
    
   
    return true;
  }

}
