import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { AuthGuardService } from './AuthGuard/auth-guard.service';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'member/tab1',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'member',canActivate:[AuthGuardService],
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./create-post/create-post.module').then( m => m.CreatePostPageModule)
  },
  {
    path: 'welcome-view',
    loadChildren: () => import('./welcome-view/welcome-view.module').then( m => m.WelcomeViewPageModule)
  }
];
@NgModule({
  imports: [



  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
