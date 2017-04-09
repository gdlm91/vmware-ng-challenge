import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasCost } from './FaasCost';
import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage'

@Injectable()
export class FaasCostService extends FaasPlatformService {

   constructor(private http: Http) {
      super();
   }

   getFaasCost(id: string): Observable<IFaasCost> {
      return this.getFaasInfo$(id)
         .concatMapTo(this.getFaasUsage$(id), (faasInfo, faasUsage) => this.getCostInfo(faasInfo, faasUsage));
   }

   private getCostInfo(faasInfo: IFaasInfo, faasUsage: IFaasUsage): IFaasCost {
      let totalMonthlyCost = this.getTotalMonthlyCost(faasInfo, faasUsage);

      let cost: IFaasCost = {
         faasInfo,
         faasUsage,
         totalMonthlyCost
      }

      return cost;
   }

   private getTotalMonthlyCost(faasInfo: IFaasInfo, faasUsage: IFaasUsage) {
      return (faasInfo.invocationCost * faasUsage.totalMonthlyInvocations) + (faasInfo.runtimeCost * faasUsage.totalMonthlyRuntime);
   }

   private getExchangeRates() {
      return this.http.get('http://api.fixer.io/latest?base=USD')
         .map((response: Response) => response.json());
   }

   private applyCurrencyExchange(cost: IFaasCost, exchangeRates: any, currency: string): IFaasCost {
      if (currency !== 'USD') {
         cost.totalMonthlyCost = exchangeRates.rates[currency] * cost.totalMonthlyCost;
      }

      return cost;
   }

}
