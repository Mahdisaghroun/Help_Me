import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeViewPage } from './welcome-view.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeViewPageRoutingModule {}
