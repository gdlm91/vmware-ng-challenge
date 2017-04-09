import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage';

/**
 * Combines the FassInfo, FassUsage and totalMemoryAllocation of a function,
 */
export interface IFaasCost {
   /**
    * The FaasInfo
    */
   faasInfo: IFaasInfo;

   /**
    * The FaasUsage
    */
   faasUsage: IFaasUsage;

   /**
    * Total Monthly Cost
    */
   totalMonthlyCost: number;
}
