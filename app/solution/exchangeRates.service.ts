import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFaasCost } from './FaasCost';

export const CURRENCY_LIST = ['USD', 'GBP', 'EUR'];

@Injectable()
export class ExchangeRatesService {

   private selectedCurrencySubject = new BehaviorSubject('USD');

   selectedCurrency$ = this.selectedCurrencySubject.asObservable();

   private exchangeRates;

   constructor(
      private http: Http
   ) { }

   getExchangeRates(): Observable<any> {
      return this.http.get('https://api.fixer.io/latest?base=USD')
         .map((response: Response) => this.exchangeRates = response.json())
         .first();
   }

   changeSelectedCurrency(currency: string) {
      this.selectedCurrencySubject.next(currency);
   }

   applyCurrencyExchange(costInfo: IFaasCost): Observable<IFaasCost> {
      return this.selectedCurrency$.map(currency => {
         if (currency !== this.exchangeRates.base) {
            costInfo.totalMonthlyCost *= this.exchangeRates.rates[currency];
         }

         return costInfo;
      });
   }

}
