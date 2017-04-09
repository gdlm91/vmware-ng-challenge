import { Component, OnInit, Input } from '@angular/core';
import { FassCostService } from './faasCost.service';
import { IFaasCost } from './FaasCost'

@Component({
   moduleId: __moduleName,
   selector: '[faas-cost]',
   templateUrl: 'faasCost.component.html'
})

export class FaasCostComponent implements OnInit {

   @Input('id')
   id: string;

   faasCost: IFaasCost;

   constructor(
      private fassCostService: FassCostService
   ) { }

   ngOnInit() {
      this.fassCostService.getFaasCost(this.id, 'EUR').subscribe(faasCost => this.faasCost = faasCost);
   }
}
