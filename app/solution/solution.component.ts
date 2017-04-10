import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaasCostService } from './faasCost.service';
import { ExchangeRatesService } from './exchangeRates.service';
import { IFaasCost } from './FaasCost';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent implements OnInit {
   private faasIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

   faasCostLists$: Observable<IFaasCost[]>;
   exgRates$: Observable<any>;

   constructor(
      private faasCostService: FaasCostService,
      private exchangeRatesService: ExchangeRatesService
   ) { }

   ngOnInit() {
      this.exgRates$ = this.exchangeRatesService.getExchangeRates();

      this.faasCostLists$ = this.faasCostService.getListFaasCost(this.faasIds);
   }
}
