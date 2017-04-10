import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage';

/**
 * Combines the FassInfo, FassUsage and totalMemoryAllocation of a function,
 */
export interface IFaasStatus {
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

   /**
    * The calculation of the Total Memory Allocation
    */
   totalMemoryAllocation: number;

   /**
    * The threshold of the Memory Allocation for color alerts
    */
   memoryAllocationThreshold: string;
}
