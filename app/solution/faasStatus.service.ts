import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasStatus } from './FaasStatus';
import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage'

@Injectable()
export class FaasStatusService extends FaasPlatformService {

   constructor() {
      super();
   }

   getListFaasStatus(ids: string[]): Observable<IFaasStatus[]> {
      let faasObsList: Observable<IFaasStatus>[] = ids.map(id => this.getFaasStatus(id).do(console.log));

      return Observable.combineLatest(faasObsList)
         .map(faasObsList => faasObsList.sort((a, b) => b.totalMonthlyCost - a.totalMonthlyCost));
   }

   getFaasStatus(id: string) {
      return Observable.combineLatest(this.getFaasInfo$(id), this.getFaasUsage$(id))
         .map(faasInfoAndUsage => this.getFaasInfo(faasInfoAndUsage));
   }

   private getFaasInfo([faasInfo, faasUsage]): IFaasStatus {
      let totalMonthlyCost = this.getTotalMonthlyCost(faasInfo, faasUsage);
      let totalMemoryAllocation = faasUsage.instances * faasInfo.memoryAllocation;
      let memoryAllocationThreshold = this.getMemoryAllocationThreshold(totalMemoryAllocation);

      let info: IFaasStatus = {
         faasInfo,
         faasUsage,
         totalMonthlyCost,
         totalMemoryAllocation,
         memoryAllocationThreshold
      }

      return info;
   }

   private getMemoryAllocationThreshold(totalMemoryAllocation: number): string {
      if (totalMemoryAllocation > 20000000) return '>20';

      if (totalMemoryAllocation > 10000000) return '>10';

      return '<10';
   }

   private getTotalMonthlyCost(faasInfo: IFaasInfo, faasUsage: IFaasUsage) {
      return (faasInfo.invocationCost * faasUsage.totalMonthlyInvocations) + (faasInfo.runtimeCost * faasUsage.totalMonthlyRuntime);
   }

}
