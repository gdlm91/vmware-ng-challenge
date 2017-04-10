import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasStatus } from './FaasStatus';

@Injectable()
export class FassStatusService extends FaasPlatformService {

   constructor() {
      super()
   }

   getListFaasStatus(ids: string[]): Observable<IFaasStatus[]> {
      let faasObsList: Observable<IFaasStatus>[] = ids.map(id => this.getFaasStatus(id).do(console.log));

      return Observable.combineLatest(faasObsList);
   }

   getFaasStatus(id: string) {
      return Observable.combineLatest(this.getFaasInfo$(id), this.getFaasUsage$(id))
         .map(faasInfoAndUsage => this.getStatusInfo(faasInfoAndUsage));
   }

   private getStatusInfo([faasInfo, faasUsage]): IFaasStatus {
      let totalMemoryAllocation = faasUsage.instances * faasInfo.memoryAllocation;
      let memoryAllocationThreshold = this.getMemoryAllocationThreshold(totalMemoryAllocation);

      let status: IFaasStatus = {
         faasInfo,
         faasUsage,
         totalMemoryAllocation,
         memoryAllocationThreshold
      }

      return status;
   }

   private getMemoryAllocationThreshold(totalMemoryAllocation: number): string {
      if (totalMemoryAllocation > 20000000) return '>20';

      if (totalMemoryAllocation > 10000000) return '>10';

      return '<10';
   }

}
