import { Component, OnInit, Input } from '@angular/core';
import { FassPlatformStatusService } from '../api/faasPlatform.service';
import { IFaasStatus } from '../api/FaasStatus'

@Component({
   moduleId: __moduleName,
   selector: '[faas-status]',
   templateUrl: 'faasStatus.component.html'
})

export class FaasStatusComponent implements OnInit {

   @Input('id')
   id: string;

   faasStatus: IFaasStatus;

   constructor(
      private faasPlatformStatusService: FassPlatformStatusService
   ) { }

   ngOnInit() {
      this.faasPlatformStatusService.getFaasStatus(this.id).subscribe(faasStatus => this.faasStatus = faasStatus);
   }
}
