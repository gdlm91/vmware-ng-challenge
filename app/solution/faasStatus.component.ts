import { Component, OnInit, Input } from '@angular/core';
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

   constructor() { }

   ngOnInit() { }
}
