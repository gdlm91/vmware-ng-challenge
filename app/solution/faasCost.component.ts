import { Component, OnInit, Input } from '@angular/core';
import { FaasCostService } from './faasCost.service';
import { IFaasCost } from './FaasCost'

@Component({
   moduleId: __moduleName,
   selector: '[faas-cost]',
   templateUrl: 'faasCost.component.html'
})

export class FaasCostComponent implements OnInit {

   @Input()
   cost: IFaasCost;

   constructor() { }

   ngOnInit() { }
}
