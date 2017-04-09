import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaasCostService } from './faasCost.service';
import { IFaasCost } from './FaasCost';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent implements OnInit {
   private faasIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

   faasCostLists: Observable<IFaasCost>[] = [];

   constructor(
      private faasCostService: FaasCostService
   ) { }

   ngOnInit() {
      this.faasIds.forEach(id => this.faasCostLists.push(this.faasCostService.getFaasCost(id)));
   }
}
