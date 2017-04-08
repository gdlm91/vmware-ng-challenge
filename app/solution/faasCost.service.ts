import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasCost } from './FaasCost';

@Injectable()
export class FassCostService extends FaasPlatformService {

   constructor(
      private http: Http
   ) {
      super()
   }

   getFaasCost(id: string): Observable<IFaasCost> {
      return this.getFaasInfo$(id).concatMapTo(this.getFaasUsage$(id), (faasInfo, faasUsage) => {
         let cost: IFaasCost = {
            faasInfo,
            faasUsage,
            totalMonthlyCost: (faasInfo.invocationCost * faasUsage.totalMonthlyInvocations) + (faasInfo.runtimeCost * (faasUsage.totalMonthlyRuntime / 100)),
            currencySymbol: 'USd'
         }

         return cost;
      });
   }

}
