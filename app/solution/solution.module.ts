import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SolutionComponent } from './solution.component';
import { FaasStatusComponent } from './faasStatus.component';
import { FassStatusService } from './faasStatus.service';

@NgModule({
   imports: [SharedModule],
   declarations: [SolutionComponent, FaasStatusComponent],
   providers: [FassStatusService],
   exports: [SolutionComponent]
})
export class SolutionModule { }
