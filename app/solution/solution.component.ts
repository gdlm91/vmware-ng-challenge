import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FassStatusService } from './faasStatus.service';
import { IFaasStatus } from './FaasStatus';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent implements OnInit {

   private faasIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

   faasStatusList$: Observable<IFaasStatus[]>;

   constructor(
      private faasStatusService: FassStatusService
   ) { }

   ngOnInit() {
      this.faasStatusList$ = this.faasStatusService.getListFaasStatus(this.faasIds);
   }
}
