import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Directive({
  selector: '[appCall]'
})
export class CallDirective implements OnInit {
  @Output('appCall') initEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }
ngOnInit(){
  this.initEvent.emit();
  console.log("helooooooooooooooooooooooooooo");
}
}
