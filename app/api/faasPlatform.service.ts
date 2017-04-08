import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../impl/faasPlatform.service';

import { IFaasUsage } from './FaasUsage';
import { IFaasInfo } from './FaasInfo';
import { IFaasStatus } from './FaasStatus';

/**
 * Exposes APIs for working with the FaaS platform.
 */
export interface IFaasPlatformService {

   /**
    * @param id
    *    ID of the FaaS function to return an Observable for.
    *
    * @returns an Observable that emits information for the given FaaS function,
    * then completes.
    */
   getFaasInfo$(id: string): Observable<IFaasInfo>;

   /**
    * @param id
    *    ID of the FaaS function to return an Observable for.
    *
    * @returns an Observable that emits usage data for the given FaaS function
    * approximately every 2 seconds.
    */
   getFaasUsage$(id: string): Observable<IFaasUsage>;
}

export { FaasPlatformService };

/** Solution Code */
///////////////////

@Injectable()
export class FassPlatformStatusService extends FaasPlatformService {

   constructor() {
      super()
   }

   getFaasStatus(id: string): Observable<IFaasStatus> {
      return this.getFaasInfo$(id).concatMapTo(this.getFaasUsage$(id), (faasInfo, faasUsage) => {
         let totalMemoryAllocation = faasUsage.instances * faasInfo.memoryAllocation;

         let status: IFaasStatus = {
            faasInfo,
            faasUsage,
            totalMemoryAllocation,
            memoryAllocationThreshold: getMemoryAllocationThreshold(totalMemoryAllocation)
         }

         return status;
      });
   }

}

function getMemoryAllocationThreshold(totalMemoryAllocation: number): string {
   if (totalMemoryAllocation > 20000000) return '>20';

   if (totalMemoryAllocation > 10000000) return '>10';

   return '<10';
}
