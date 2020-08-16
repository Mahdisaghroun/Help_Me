import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnDestroy {

  constructor() {
    
  }
  ngOnDestroy(){
    localStorage.clear();
  }

}
