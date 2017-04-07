/**
 * Describes a FaaS function.
 */
export interface IFaasInfo {
   /**
    * Unique ID.
    */
   id: string;

   /**
    * Name.
    */
   name: string;

   /**
    * Describes the function's purpose.
    */
   description: string;

   /**
    * Amount of RAM available to the function at runtime.
    */
   memoryAllocation: number;
}
