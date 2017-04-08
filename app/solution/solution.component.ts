import { Component, OnInit } from '@angular/core';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent implements OnInit {

   faasIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

   constructor() { }

   ngOnInit() { }
}
