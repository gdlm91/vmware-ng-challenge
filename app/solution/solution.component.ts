import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaasStatusService } from './faasStatus.service';
import { IFaasStatus } from './FaasStatus';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent implements OnInit {
   faasStatusListEnabled: Observable<IFaasStatus[]>;

   faasStatusListDisabled: Observable<IFaasStatus[]>;

   constructor(
      private faasStatusService: FaasStatusService
   ) { }

   ngOnInit() {
      this.faasStatusListEnabled = this.faasStatusService.getListFaasStatusEnabled();

      this.faasStatusListDisabled = this.faasStatusService.getListFaasStatusDisabled();
   }

   toggleFaasStatus(faas: IFaasStatus) {
      this.faasStatusService.toggleFaasStatus(faas);
   }
}
