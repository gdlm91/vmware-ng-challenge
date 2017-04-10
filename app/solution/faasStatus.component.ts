import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFaasStatus } from './FaasStatus'

@Component({
   moduleId: __moduleName,
   selector: 'faas-status',
   templateUrl: 'faasStatus.component.html',
   styleUrls: ['faasStatus.component.css']
})

export class FaasStatusComponent implements OnInit {

   @Input()
   faasStatusLists: IFaasStatus[];

   @Output()
   toggleClick = new EventEmitter();

   constructor() { }

   ngOnInit() { }

   toggleStatus($event, faas) {
      $event.preventDefault();
      this.toggleClick.emit(faas);
   }
}
