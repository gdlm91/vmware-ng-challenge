import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';
import { ExchangeRatesService } from './exchangeRates.service'

import { IFaasCost } from './FaasCost';
import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage'

@Injectable()
export class FaasCostService extends FaasPlatformService {

   constructor(
      private http: Http,
      private exchangeRatesService: ExchangeRatesService
   ) {
      super();
   }

   getListFaasCost(ids: string[]): Observable<IFaasCost[]> {
      let faasObsList: Observable<IFaasCost>[] = ids.map(id => this.getFaasCost(id));

      return Observable.combineLatest(faasObsList);
   }

   getFaasCost(id: string) {
      return Observable.combineLatest(this.getFaasInfo$(id), this.getFaasUsage$(id))
         .map(faasInfoAndUsage => this.getCostInfo(faasInfoAndUsage))
         .switchMap(costInfo => this.exchangeRatesService.applyCurrencyExchange(costInfo));;
   }

   private getCostInfo([faasInfo, faasUsage]): IFaasCost {
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

}
