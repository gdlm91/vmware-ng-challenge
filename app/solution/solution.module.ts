import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SolutionComponent } from './solution.component';
import { FaasCostComponent } from './faasCost.component';
import { FaasCostService } from './faasCost.service';
import { HttpModule } from '@angular/http';

@NgModule({
   imports: [SharedModule, HttpModule],
   declarations: [SolutionComponent, FaasCostComponent],
   exports: [SolutionComponent],
   providers: [FaasCostService],
})
export class SolutionModule { }
