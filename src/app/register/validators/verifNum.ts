import { AbstractControl } from '@angular/forms';
import { AuthService } from './../../service/auth.service';

export function ValidateNum(control: AbstractControl,auth : AuthService) {
    
  
    return { validNum: true };
  
  return null;
}