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
   private faasIds = ['1', '2', '3', '4'];

   faasStatusLists: Observable<IFaasStatus>[] = [];

   constructor(
      private faasStatusService: FaasStatusService
   ) { }

   ngOnInit() {
      this.faasIds.forEach(id => this.faasStatusLists.push(this.faasStatusService.getFaasStatus(id)));
   }
}
