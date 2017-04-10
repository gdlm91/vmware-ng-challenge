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

   getFaasStatus(id: string): Observable<IFaasStatus> {
      return this.getFaasInfo$(id)
         .concatMapTo(this.getFaasUsage$(id), (faasInfo, faasUsage) => this.getFaasInfo(faasInfo, faasUsage));
   }

   private getFaasInfo(faasInfo: IFaasInfo, faasUsage: IFaasUsage): IFaasStatus {
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
