import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasCost } from './FaasCost';

@Injectable()
export class FassCostService extends FaasPlatformService {
   exgRates;

   constructor(private http: Http) {
      super();
   }

   getExchangeRates() {
      return this.http.get('http://api.fixer.io/latest?base=USD')
         .map((response: Response) => response.json());
   }

   getFaasCostInfo(id: string, currency: string = 'USD'): Observable<IFaasCost> {
      return this.getFaasInfo$(id).concatMapTo(this.getFaasUsage$(id), (faasInfo, faasUsage) => {
         let cost: IFaasCost = {
            faasInfo,
            faasUsage,
            totalMonthlyCost: (faasInfo.invocationCost * faasUsage.totalMonthlyInvocations) + (faasInfo.runtimeCost * (faasUsage.totalMonthlyRuntime / 100)),
            currencySymbol: currency
         }

         return cost;
      });
   }

   applyCurrencyExchange(cost: IFaasCost, exchangeRates: any, currency: string): IFaasCost {
      if (currency !== 'USD') {
         cost.totalMonthlyCost = exchangeRates.rates[currency] * cost.totalMonthlyCost;
      }

      return cost;
   }

   getFaasCost(id: string, currency: string = 'USD'): Observable<IFaasCost> {
      let exchangeRates;

      return this.getExchangeRates()
         .switchMap(exgRates => {
            exchangeRates = exgRates;
            return this.getFaasCostInfo(id, currency);
         })
         .map(cost => this.applyCurrencyExchange(cost, exchangeRates, currency));
   }

}
