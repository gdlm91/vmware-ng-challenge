import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FaasPlatformService } from '../api/faasPlatform.service';

import { IFaasStatus } from './FaasStatus';
import { IFaasInfo } from '../api/FaasInfo';
import { IFaasUsage } from '../api/FaasUsage'

@Injectable()
export class FaasStatusService extends FaasPlatformService {
   private faasIds = ['1', '2', '3', '4'];
   private faasDisabledQty: number = 0;

   constructor() {
      super();
   }

   getListFaasStatusEnabled(): Observable<IFaasStatus[]> {
      return this.getListFaasStatus()
         .map((faasObsList: IFaasStatus[]) => faasObsList.filter(faas => faas.faasUsage.enabled))
   }

   getListFaasStatusDisabled(): Observable<IFaasStatus[]> {
      return this.getListFaasStatus()
         .map((faasObsList: IFaasStatus[]) => faasObsList.filter(faas => !faas.faasUsage.enabled))
   }

   toggleFaasStatus(faas: IFaasStatus) {
      let newStatus = !faas.faasUsage.enabled;

      if (!newStatus) {
         this.faasDisabledQty++
      } else {
         this.faasDisabledQty--
      };

      if (this.faasDisabledQty === this.faasIds.length) {
         this.faasDisabledQty--;
      } else {
         this.enableFaas(faas.faasInfo.id, newStatus).subscribe();
      }

   }

   private getListFaasStatus(): Observable<IFaasStatus[]> {
      let faasObsList: Observable<IFaasStatus>[] = this.faasIds.map(id => this.getFaasStatus(id));

      return Observable.combineLatest(faasObsList)
         .map(faasObsList => faasObsList.sort((a, b) => b.totalMonthlyCost - a.totalMonthlyCost));
   }

   private getFaasStatus(id: string) {
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
