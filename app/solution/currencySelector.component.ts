import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRatesService, CURRENCY_LIST } from './exchangeRates.service';

@Component({
   moduleId: __moduleName,
   selector: 'currency-selector',
   templateUrl: 'currencySelector.component.html'
})
export class CurrencySelectorComponent implements OnInit {

   selCurrency$: Observable<string>;

   currencyList;

   constructor(
      private exchangeRatesService: ExchangeRatesService
   ) { }

   ngOnInit() {
      this.currencyList = CURRENCY_LIST;

      this.selCurrency$ = this.exchangeRatesService.selectedCurrency$;
   }

   selectCurrency(currency: string) {
      console.log(currency);
      this.exchangeRatesService.changeSelectedCurrency(currency);
   }
}
