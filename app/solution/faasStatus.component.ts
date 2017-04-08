import { Component, OnInit, Input } from '@angular/core';
import { FassStatusService } from './faasStatus.service';
import { IFaasStatus } from './FaasStatus'

@Component({
   moduleId: __moduleName,
   selector: '[faas-status]',
   templateUrl: 'faasStatus.component.html',
   styleUrls: ['faasStatus.component.css']
})

export class FaasStatusComponent implements OnInit {

   @Input('id')
   id: string;

   faasStatus: IFaasStatus;

   constructor(
      private faasStatusService: FassStatusService
   ) { }

   ngOnInit() {
      this.faasStatusService.getFaasStatus(this.id).subscribe(faasStatus => this.faasStatus = faasStatus);
   }
}
