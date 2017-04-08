import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SolutionComponent } from './solution.component';
import { FaasStatusComponent } from './faasStatus.component';

@NgModule({
   imports: [SharedModule],
   declarations: [SolutionComponent, FaasStatusComponent],
   exports: [SolutionComponent]
})
export class SolutionModule { }
