/**
 * Holds real-time usage information for a FaaS function.
 */
export interface IFaasUsage {
   /**
    * ID of the FaaS function that this usage info applies to.
    */
   functionId: string;

   /**
    * The number of instances of the function that are currently executing.
    */
   instances: number;

   /**
    * 'HEALTHY' if the majority of recent executions of the function exited
    * normally. Else, 'ERROR'.
    */
   state: 'HEALTHY' | 'ERROR';
}