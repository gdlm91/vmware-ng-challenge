import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { ExchangeRatesService } from './exchangeRates.service';
import { IFaasCost } from './FaasCost'

@Component({
   moduleId: __moduleName,
   selector: '[faas-cost]',
   templateUrl: 'faasCost.component.html'
})

export class FaasCostComponent implements OnInit {

   @Input()
   costInfo: IFaasCost;

   currency$: Observable<string>;

   constructor(
      private exchangeRatesService: ExchangeRatesService
   ) { }

   ngOnInit() {
      this.currency$ = this.exchangeRatesService.selectedCurrency$;
   }
}
