import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SolutionComponent } from './solution.component';
import { FaasStatusComponent } from './faasStatus.component';
import { FaasStatusService } from './faasStatus.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
   imports: [SharedModule, HttpModule, FormsModule],
   declarations: [SolutionComponent, FaasStatusComponent],
   exports: [SolutionComponent],
   providers: [FaasStatusService],
})
export class SolutionModule { }
